import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FloatingButton from "./components/FloatingButton";
import Wrapper from "./components/Wrapper";
import { timeout } from "./lib/utilitys";
import Home from "./pages/Home";
import Login from "./pages/Login";
import useLoad from "./store/widget-loader";
import useOpen from "./store/widget-open";
const App = () => {
  const { open, setOpen } = useOpen((state) => state);
  const { isLoad, setIsLoad } = useLoad((state) => state);
  const handleChange = async () => {
    await setOpen();
    await window.parent.postMessage(open ? "hide" : "show", "*");
  };
  React.useEffect(() => {
    const handleLoader = async () => {
      if (isLoad) {
        await timeout(3000);
        await setIsLoad();
      }
    };
    if (open) handleLoader();
  }, [open, isLoad]);
  return (
    <BrowserRouter>
      <Wrapper open={open}>
        <>
          {open && !isLoad && (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
            </Routes>
          )}
          {open && isLoad && <p>Load</p>}
        </>
      </Wrapper>

      {!open && <FloatingButton open={open} onClick={handleChange} />}
    </BrowserRouter>
  );
};
export default App;
