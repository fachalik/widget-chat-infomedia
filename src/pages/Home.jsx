import React from "react";
import { useNavigate } from "react-router-dom";
// import Wrapper from "../components/Wrapper";
import useOpen from "../store/widget-open";
const Home = () => {
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
    // <Wrapper open={open}>
    <>
      <button onClick={() => navigate("login")}>go to login</button>
      <button onClick={() => setOpen()}>close</button>
    </>
    // </Wrapper>
    );
};
export default Home;
