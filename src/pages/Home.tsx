import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import HeaderWithClose from "../components/Header/Header";
import { timeout } from "../lib/utilitys";
import useWidgetOpen from "../store/widget-open";
import useWidgetStore from "../store/widget-store";

const Home = () => {
  const navigate = useNavigate();
  const { setToken } = useWidgetStore((state) => state);
  const { setOpen } = useWidgetOpen((state) => state);
  const [acc, setAcc] = React.useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleOpenSnackBar = async () => {
    await setIsLoading(true);
    await timeout(2000);
    await setOpenSnackBar(true);
    await setIsLoading(false);
  };

  const handleNextTab = async () => {
    await setIsLoading(true);
    await timeout(2000);
    setToken("asd");
    await setIsLoading(false);
  };

  const handleClose = () => {
    setOpenSnackBar(false);
  };

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
      <HeaderWithClose option close onClick={() => setOpen()} />
      <Stack
        spacing={2}
        sx={{ height: "70vh" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <p>data here</p>
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

export default Home;
