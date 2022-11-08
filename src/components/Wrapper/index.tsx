import Box from "@mui/material/Box";
import React, { FC } from "react";

interface IProps {
  open: boolean;
  children: JSX.Element;
}

const index: FC<IProps> = ({ open, children }) => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      height="95%"
      width="95%"
      borderRadius={"15px"}
      sx={{
        MozBorderRadius: "10px",
        webkitBorderRadius: "10px",
        transform: "translate(-50%, -50%)",
        opacity: open ? "100%" : "0%",
        transition: "all 200ms ease-in-out",
        zIndex: 2,
        boxShadow: "1px 2px 9px 1px rgba(0,0,0,0.75)",
        webkitBoxShadow: "1px 2px 9px 1px rgba(0,0,0,0.75)",
        mozBoxShadow: "1px 2px 9px 1px rgba(0,0,0,0.75)",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default index;
