import { Box, Chip, Divider } from "@mui/material";
import React from "react";

import BubbleChat from "../components/BubbleChat";
import LoaderChat from "../components/LoaderChat";
import Ratings from "../components/Rating";
import WrapperChat from "../components/WrapperChat";
import useWidgetChat from "../store/widget-chat";

const Home = () => {
  const { message, scrollToBottom, showLoader, chatOn } = useWidgetChat(
    (state) => state
  );

  return (
    <WrapperChat>
      <Box
        id={"testing"}
        sx={{
          height: !chatOn ? "100%" : "82%",
          backgroundColor: "#e0e0e0",
          paddingX: "10px",
          paddingY: "15px",
          overflow: "auto",
          msOverflowStyle: "none" /* for Internet Explorer, Edge */,
          scrollbarWidth: "none" /* for Firefox */,
          overflowY: "auto",
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
        {!chatOn && (
          <>
            <Divider>
              <Chip label={"Chat berakhir"} />
            </Divider>
            <Ratings />
          </>
        )}
        {showLoader && <LoaderChat />}
        <div id="wgChat-endmessage" />
      </Box>
    </WrapperChat>
  );
};

export default Home;
