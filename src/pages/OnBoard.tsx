import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { Form, Formik } from "formik";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as yup from "yup";

import HeaderWithClose from "../components/Header/Header";
import useWidgetChat from "../store/widget-chat";

interface TForm {
  email: string;
  username: string;
  mobilePhone: string;
}

const OnBoard = () => {
  const {
    createSession,
    loading,
    postLoginToken,
    setPostLoginToken,
    closeWidget,
  } = useWidgetChat((state) => state);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);

  const [initialValues] = React.useState<TForm>({
    email: "",
    username: "",
    mobilePhone: "",
  });

  const [postLogin, setPostLogin] = React.useState<any>(null);
  const [chapca, setChapca] = React.useState<any>(null);
  const siteKeyRecaptcha = import.meta.env.VITE_KEYRECAPTCHA;

  const reCaptchaCheck = (val: any) => {
    setChapca(val);
  };

  const decrypt_om = (val: any) => {
    try {
      var key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_KEY);
      var iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_IV);

      var ciphertext = CryptoJS.enc.Base64.parse(val);
      var encryptedCP = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext,
        formatter: CryptoJS.format.OpenSSL,
      });
      var decryptedWA = CryptoJS.AES.decrypt(encryptedCP, key, { iv: iv });

      var decryptedUtf8 = decryptedWA.toString(CryptoJS.enc.Utf8);
      return decryptedUtf8 ? JSON.parse(decryptedUtf8) : null;
    } catch (error) {
      return null;
    }
  };

  React.useEffect(() => {
    if (postLoginToken) {
      const postLogin = decrypt_om(postLoginToken);
      if (postLogin) {
        setPostLoginToken(postLogin);
        setPostLogin(postLogin);
      }
    }
  }, []);

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const field: any[] = [
    {
      name: "username",
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
    },
    {
      name: "mobilePhone",
      label: "Mobile Phone",
      type: "text",
    },
  ];

  const validationSchema = yup.object().shape({
    username: yup.string().required("Name dibutuhkan"),
    email: yup.string().email("Email tidak valid").required("Email dibutuhkan"),
    mobilePhone: yup
      .number()
      .typeError("Mobile Phone harus berupa angka")
      .required("Mobile Phone dibutuhkan"),
  });

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <HeaderWithClose close onClick={() => closeWidget()} />
      <Stack
        spacing={2}
        sx={{ height: "85%", backgroundColor: "white" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {postLogin ? (
          <Box
            alignItems="center"
            margin="auto"
            padding="20px 10px"
            boxShadow="0px 4px 10px 0px #0000000D"
            border="1px solid #c4c4c4"
            borderRadius="8px"
          >
            <Typography align="center" style={{ marginBottom: 20 }}>
              Hello {postLogin?.username}, klik start untuk memulai chat dengan
              tim kami.
            </Typography>
            <Button
              disabled={loading}
              variant="contained"
              size="medium"
              sx={{ width: 300 }}
              onClick={() => createSession(postLogin)}
            >
              {loading ? <CircularProgress size={22} /> : "Saya Setuju"}
            </Button>
          </Box>
        ) : (
          <Box
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            padding="20px 10px"
            boxShadow="0px 4px 10px 0px #0000000D"
            border="1px solid #c4c4c4"
            borderRadius="8px"
            width={"90%"}
            sx={{ backgroundColor: "white" }}
          >
            <Typography sx={{ margin: 0 }}>
              Silakan isi formulir di bawah ini untuk memulai percakapan dengan
              kami
            </Typography>
            <Formik
              initialValues={{
                ...initialValues,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const post = {
                  ...values,
                  mobilePhone: "+62" + values.mobilePhone.replace("0", ""),
                  "g-recaptcha-response": chapca,
                };
                createSession(post);
              }}
            >
              {({ errors, touched, handleChange, handleBlur, isValid }) => (
                <Form>
                  {field.map((val, index: number) => (
                    <Box key={String(index)}>
                      <TextField
                        onBlur={handleBlur}
                        name={val.name}
                        type={val.type}
                        label={val.label}
                        onChange={handleChange}
                        sx={{ width: "100%", marginTop: "5px" }}
                      />
                      {val.name === "username" &&
                        (errors.username && touched.username ? (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.username}
                          </p>
                        ) : null)}
                      {val.name === "email" &&
                        (errors.email && touched.email ? (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.email}
                          </p>
                        ) : null)}
                      {val.name === "mobilePhone" &&
                        (errors.mobilePhone && touched.mobilePhone ? (
                          <p style={{ fontSize: 14, color: "red" }}>
                            {errors.mobilePhone}
                          </p>
                        ) : null)}
                      <Box marginBottom={1} />
                    </Box>
                  ))}
                  {siteKeyRecaptcha && (
                    <ReCAPTCHA
                      sitekey={siteKeyRecaptcha}
                      onChange={reCaptchaCheck}
                      onExpired={() => {
                        setChapca(null);
                      }}
                    />
                  )}
                  <Box display="flex" margin="10px">
                    <Button
                      size="small"
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={
                        !isValid || loading || (siteKeyRecaptcha && !chapca)
                      }
                      style={{
                        textTransform: "none",
                        marginLeft: "auto",
                      }}
                    >
                      {!loading ? "Start Chat" : "Loading..."}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Stack>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleClose}
        key={"bottom center"}
      >
        <Alert severity="error">
          Maaf, kamu harus menyetujui ketentuan penggunaan dan kebijakan privasi
          sebelum memulai percakapan.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OnBoard;
