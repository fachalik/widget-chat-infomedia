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

import HeaderWithClose from "../components/Header/Header";
import { timeout } from "../lib/utilitys";
import useWidgetStore from "../store/widget-store";

const OnBoard = () => {
  const { setOpen, setToken } = useWidgetStore((state) => state);
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
      <HeaderWithClose close onClick={() => setOpen()} />
      <Stack
        spacing={2}
        sx={{ height: "70vh" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: "100%",
            top: "80px",
            borderRadius: "22px 22px 0px 00px",
          }}
        >
          <Typography variant="h6">
            Halo, saya <b>Bot</b>.
          </Typography>
          <Typography>Apa yang bisa bot bantu hari ini?</Typography>
        </Box>
        <Card
          sx={{
            maxWidth: 300,
          }}
          variant="outlined"
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Stack direction={"row"}>
              <Box sx={{ height: "10px" }}>
                <Checkbox checked={acc} onClick={() => setAcc(!acc)} />
              </Box>
              <Typography
                variant="caption"
                sx={{ cursor: "pointer" }}
                onClick={() => setAcc(!acc)}
              >
                Dengan menggunakan layanan Chatbot ini, saya menyatakan bahwa
                saya menyetujui Syarat dan Penggunaan dan Kebijakan Informasi
                Chatbot, dan bahwa informasi yang saya berikan di sini adalah
                benar.
              </Typography>
            </Stack>
            <Button variant="text" size="small">
              Syarat Penggunaan
            </Button>
          </CardContent>
        </Card>
        <Button
          disabled={isLoading}
          variant="contained"
          size="medium"
          sx={{ width: 300 }}
          onClick={() => (acc ? handleNextTab() : handleOpenSnackBar())}
        >
          {isLoading ? <CircularProgress size={22} /> : "Saya Setuju"}
        </Button>
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
