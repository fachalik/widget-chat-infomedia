import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

import HeaderWithClose from "../components/Header/Header";
import useWidgetStore from "../store/widget-store";

const OnBoard = () => {
  const { setOpen } = useWidgetStore((state) => state);
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
      <Stack>
        <HeaderWithClose close onClick={() => setOpen()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            // zIndex: 4,
            backgroundColor: "white",
            // position: "absolute",
            width: "100%",
            top: "80px",
            borderRadius: "22px 22px 0px 00px",
          }}
        >
          <Typography>Logo Here</Typography>
          <Typography>Halo, saya Bot.</Typography>
          <Typography>Apa yang bisa bot bantu hari ini?</Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default OnBoard;
