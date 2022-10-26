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
      top="0"
      right="0"
      height="100%"
      width="100%"
      bgcolor="red"
      sx={{
        transform: `translateX(${open ? 0 : 100}%) translateY(${
          open ? 0 : 100
        }%) translateZ(0px)`,
        opacity: open ? "100%" : "0%",
        transition: "all 200ms ease-in-out",
      }}
    >
      {children}
    </Box>
  );
};

export default index;
