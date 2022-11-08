import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import SwipeableViews from "react-swipeable-views";

import useWidgetChat from "../../store/widget-chat";

const AutoPlaySwipeableViews = SwipeableViews;

interface IProps {
  data: any[];
}

const Carousel: FC<IProps> = ({ data }) => {
  const { sendMessageCarousel } = useWidgetChat((state) => state);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.map((step: any, index: number) => (
          <div
            key={`${step.label}_${index}`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 105,
                  display: "block",
                  overflow: "hidden",
                  width: "70%",
                  objectFit: "contain",
                }}
                src={step.picture}
                alt={step.title}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography variant={"h6"}>{data[activeStep].title}</Typography>
        <Typography variant={"subtitle2"}>
          {data[activeStep].subtitle}
        </Typography>
      </Paper>
      <Box>
        <List>
          {data[activeStep].menu?.map((res: any, idx: number) => (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  sendMessageCarousel(res.value, "bot", res.label);
                  // context.sendMessageButton(val.value, "bot", val.label);
                  // context.sendMessageCarousel(res.value, "bot", res.label);
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "black",
                  }}
                  primary={res.label}
                />
              </ListItemButton>
            </ListItem>
            // <Button
            //   variant="contained"
            //   color="primary"
            //   key={idx}
            //   onClick={() => {
            //     sendMessageCarousel(res.value, "bot", res.label);
            //     // context.sendMessageButton(val.value, "bot", val.label);
            //     // context.sendMessageCarousel(res.value, "bot", res.label);
            //   }}
            // >
            //   {res.label}
            // </Button>
          ))}
        </List>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default Carousel;
