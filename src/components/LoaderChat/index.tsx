import "./index.scss";

import { Box } from "@mui/material";
import React from "react";

function LoaderChat() {
  return (
    <Box
      sx={{
        height: "50px",
        marginY: "10px",
        width: "80px",
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
        borderRadius: "30px",
      }}
    >
      <div className="dot-falling" />
    </Box>
  );
}

export default LoaderChat;
