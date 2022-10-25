import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";

import useOpen from "../store/widget-open";

const Login = () => {
  const navigate = useNavigate();
  const { open, setOpen } = useOpen((state) => state);
  React.useEffect(() => {
    window.addEventListener("message", (e) => console.log(e));
  }, []);

  const hide = () => {
    console.log("function hide");
    window.parent.postMessage("hide", "*");
  };
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
      // onClick={}
    >
      <button onClick={() => navigate("/")}>go to home</button>
      <button onClick={() => setOpen()}>close</button>
      {/* <div onClick={() => setOpen()}>close</div> */}
    </Box>
  );
};

export default Login;
