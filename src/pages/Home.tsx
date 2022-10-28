import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import ChatComponent from "../components/ChatComponent";
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
        position: "relative",
        width: "100%",
        height: "100% ",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <HeaderWithClose option close onClick={() => setOpen()} />
      <Box sx={{ height: "81%", backgroundColor: "#e0e0e0", paddingX: "10px" }}>
        <p>data here</p>
      </Box>
      <ChatComponent />
    </Container>
  );
};

export default Home;
