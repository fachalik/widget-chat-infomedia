import { Box } from "@mui/material";
import React from "react";

import WrapperChat from "../components/WrapperChat";
import useWidgetChat from "../store/widget-chat";

const Home = () => {
  const { chat } = useWidgetChat((state) => state);
  return (
    <WrapperChat>
      <Box sx={{ height: "82%", backgroundColor: "#e0e0e0", paddingX: "10px" }}>
        {chat?.map((data, idx) => (
          <div key={idx}>{data}</div>
        ))}
      </Box>
    </WrapperChat>
  );
};

export default Home;
