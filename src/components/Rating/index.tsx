import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import * as yup from "yup";

import useWidgetChat from "../../store/widget-chat";

import { timeout } from "../../lib/utilitys";

interface IForm {
  rating: number | null;
}

const Ratings = () => {
  const { sendRating, clearSession } = useWidgetChat((state) => state);
  // ** yup model
  const yupModalReview = yup.object().shape({
    rating: yup
      .number()
      .min(0, "Rating must greater than 0")
      .required("Rating score must be added"),
  });

  const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form] = React.useState<IForm>({
    rating: null,
  });

  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" fontSize="large" />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" fontSize="large" />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" fontSize="large" />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
      label: "Very Satisfied",
    },
  };

  const IconContainer = (props: IconContainerProps) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  };

  const handleFetchReview = async (value: any) => {
    await setIsLoading(true);
    await timeout(2000);
    await sendRating(value?.rating);
    await timeout(2000);
    await setIsLoading(false);
    await clearSession();
  };
  return (
    <Formik
      validationSchema={yupModalReview}
      initialValues={form}
      onSubmit={(values) => {
        handleFetchReview(values);
        // console.log(values);
      }}
    >
      {(props) => {
        const { values, handleChange, handleBlur } = props;
        return (
          <div>
            <Form>
              <Container
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>Chat telah berakhir</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <StyledRating
                    name="rating"
                    id="rating"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rating}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value: number) => customIcons[value].label}
                    highlightSelectedOnly
                  />
                </Box>
              </Container>
              {values.rating !== null && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ width: "50%", marginTop: "15px" }}
                  >
                    {!isLoading ? (
                      <span className="indicator-label">SAVE</span>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress size={"24px"} />
                      </Box>
                    )}
                  </Button>
                </Box>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Ratings;
