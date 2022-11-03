import { Box } from "@mui/material";
import React from "react";

import WrapperChat from "../components/WrapperChat";
import socket from "../lib/socket";
import useWidgetChat from "../store/widget-chat";

const Home = () => {
  const { message } = useWidgetChat((state) => state);
  console.log(message);

  return (
    <WrapperChat>
      <Box sx={{ height: "82%", backgroundColor: "#e0e0e0", paddingX: "10px" }}>
        {/* {message?.map((data: any, idx: number) => (
          <div key={idx}>{data?.message}</div>
        ))} */}
      </Box>
    </WrapperChat>
  );
};

export default Home;
