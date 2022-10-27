import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography>Image here</Typography>
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loading;
