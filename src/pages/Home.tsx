import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// import Wrapper from "../components/Wrapper";
import useWidgetStore from "../store/widget-store";

const Home = () => {
  const navigate = useNavigate();
  const { open, setOpen } = useWidgetStore((state) => state);
  React.useEffect(() => {
    // !open
    //   ? window.postMessage("message", "show")
    //   : window.postMessage("message", "hide");
    // window.addEventListener("message", (e) => console.log(e));
  }, []);

  const hide = () => {
    console.log("function hide");
    window.parent.postMessage("hide", "*");
  };
  return (
    // <Wrapper open={open}>

    <Box sx={{ backgroundColor: "red", height: "100%" }}>
      <button onClick={() => window.postMessage("message", "hide")}>hit</button>
      <button onClick={() => navigate("login")}>go to login</button>
      <button onClick={() => setOpen()}>close</button>
    </Box>
    // </Wrapper>
  );
};

export default Home;
