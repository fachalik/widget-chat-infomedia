import { Box, Container } from "@mui/material";
import React from "react";

import ChatComponent from "../components/ChatComponent";
import HeaderWithClose from "../components/Header/Header";
import useWidgetOpen from "../store/widget-open";

const Home = () => {
  const { setOpen } = useWidgetOpen((state) => state);

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
