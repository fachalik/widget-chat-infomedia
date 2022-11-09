import { Container } from "@mui/material";
import React, { FC } from "react";

import useWidgetChat from "../../store/widget-chat";
import ChatComponent from "../ChatComponent";
import HeaderWithClose from "../Header/Header";

interface IProps {
  children: JSX.Element;
}

const WrapperChat: FC<IProps> = ({ children }) => {
  const { closeWidget } = useWidgetChat((state) => state);

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        position: "relative",
        width: "100%",
        height: "100% ",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#e0e0e0",
      }}
    >
      <HeaderWithClose option close onClick={() => closeWidget()} />
      {children}
      <ChatComponent />
    </Container>
  );
};

export default WrapperChat;
