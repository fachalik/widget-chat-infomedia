import { Container } from "@mui/material";
import React, { FC } from "react";

import useWidgetOpen from "../../store/widget-open";
import ChatComponent from "../ChatComponent";
import HeaderWithClose from "../Header/Header";

interface IProps {
  children: JSX.Element;
}

const WrapperChat: FC<IProps> = ({ children }) => {
  const { setOpen } = useWidgetOpen((state) => state);
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
      }}
    >
      <HeaderWithClose option close onClick={() => setOpen()} />
      {children}
      <ChatComponent />
    </Container>
  );
};

export default WrapperChat;
