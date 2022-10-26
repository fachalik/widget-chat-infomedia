import Box from "@mui/material/Box";
import React from "react";
const index = ({ open, children }) => {
    return (<Box position="absolute" top="0" right="0" height="100%" width="100%" bgcolor="red" sx={{
            transform: `translateX(${open ? 0 : 100}%) translateY(${open ? 0 : 100}%) translateZ(0px)`,
            opacity: open ? "100%" : "0%",
            transition: "all 200ms ease-in-out",
        }}>
      {children}
    </Box>);
};
export default index;
