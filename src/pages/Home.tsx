import { Box } from "@mui/material";
import React from "react";

import WrapperChat from "../components/WrapperChat";

const Home = () => {
  return (
    <WrapperChat>
      <Box sx={{ height: "82%", backgroundColor: "#e0e0e0", paddingX: "10px" }}>
        <p>data here</p>
      </Box>
    </WrapperChat>
  );
};

export default Home;
