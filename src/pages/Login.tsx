import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";

// import Wrapper from "../components/Wrapper";
import useWidgetOpen from "../store/widget-open";

const Login = () => {
  const navigate = useNavigate();
  const { open, setOpen } = useWidgetOpen((state) => state);
  React.useEffect(() => {
    window.addEventListener("message", (e) => console.log(e));
  }, []);

  const hide = () => {
    console.log("function hide");
    window.parent.postMessage("hide", "*");
  };
  return (
    // <Wrapper open={open}>
    <>
      <button onClick={() => navigate("/")}>go to home</button>
      <button onClick={() => setOpen()}>close</button>
    </>
    // </Wrapper>
  );
};

export default Login;
