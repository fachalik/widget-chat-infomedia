import { Box } from "@mui/material";
import React from "react";

import BubbleChat from "../components/BubbleChat";
import WrapperChat from "../components/WrapperChat";
import useWidgetChat from "../store/widget-chat";

const Home = () => {
  const { message } = useWidgetChat((state) => state);

  return (
    <WrapperChat>
      <Box
        sx={{
          height: "82%",
          backgroundColor: "#e0e0e0",
          paddingX: "10px",
          overflow: "auto",
        }}
      >
        {message?.map((val: any, idx: number) => (
          <BubbleChat
            key={idx}
            message={val.message}
            from={val.from}
            type={val.type}
            time={val.time}
            {...val}
          />
        ))}
      </Box>
    </WrapperChat>
  );
};

export default Home;
