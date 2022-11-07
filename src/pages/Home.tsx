import { Box } from "@mui/material";
import React from "react";

import BubbleChat from "../components/BubbleChat";
import LoaderChat from "../components/LoaderChat";
import WrapperChat from "../components/WrapperChat";
import useWidgetChat from "../store/widget-chat";

const Home = () => {
  const { message, scrollToBottom, showLoader } = useWidgetChat(
    (state) => state
  );

  // React.useEffect(() => {
  //   scrollToBottom();
  // });

  return (
    <WrapperChat>
      <Box
        id={"testing"}
        sx={{
          height: "82%",
          backgroundColor: "#e0e0e0",
          paddingX: "10px",
          overflow: "auto",
          msOverflowStyle: "none" /* for Internet Explorer, Edge */,
          scrollbarWidth: "none" /* for Firefox */,
          overflowY: "scroll",
          bottom: 0,
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
        {showLoader && <LoaderChat />}
        <div id="wgChat-endmessage" />
      </Box>
    </WrapperChat>
  );
};

export default Home;
