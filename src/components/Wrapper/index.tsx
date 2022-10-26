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
      height="90%"
      width="90%"
      bgcolor="white"
      sx={{
        transform: "translate(-50%, -50%)",
        boxShadow: "-1px 0px 11px -2px rgba(0,0,0,0.81)",
        WebkitBoxShadow: "-1px 0px 11px -2px rgba(0,0,0,0.81)",
        MozBoxShadow: "-1px 0px 11px -2px rgba(0,0,0,0.81)",
        opacity: open ? "100%" : "0%",
        transition: "all 200ms ease-in-out",
        borderRadius: "15px",
        zIndex: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default index;
