import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import useWidgetOpen from "../store/widget-open";

const Home = () => {
  const navigate = useNavigate();
  const { setOpen } = useWidgetOpen((state) => state);

  return (
    <Box sx={{ backgroundColor: "white", height: "100%" }}>
      <button onClick={() => navigate("login")}>go to login</button>
      <button onClick={() => setOpen()}>close</button>
    </Box>
  );
};

export default Home;
