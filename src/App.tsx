import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import FloatingButton from "./components/FloatingButton";
import FloatingDialog from "./components/FloatingDialog";
import Wrapper from "./components/Wrapper";
import { timeout } from "./lib/utilitys";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import OnBoard from "./pages/OnBoard";
import { Logout } from "./routes/Logout";
import useWidgetOpen from "./store/widget-open";
import useWidgetStore from "./store/widget-store";

const App = () => {
  const { isLoad, token, setIsLoad, setColor, setLogo } = useWidgetStore(
    (state) => state
  );
  const { open, setOpen } = useWidgetOpen((state) => state);

  const [isToggle, setIsToggle] = React.useState<boolean>(true);

  const handleChange = async () => {
    await setOpen();
    await window.parent.postMessage(open ? "hide" : "show", "*");
  };

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const primary_color = searchParams.get("primaryColor");
    const secondary_color = searchParams.get("secondaryColor");
    const logo = searchParams.get("logo");
    const color = {
      primary_color,
      secondary_color,
    };
    if (logo !== null) setLogo(logo);
    if (primary_color !== null && secondary_color !== null) {
      setColor(color);
    }
  }, []);

  React.useEffect(() => {
    const handleLoader = async () => {
      if (isLoad) {
        await timeout(3000);
        await setIsLoad();
      }
    };
    if (open) handleLoader();
  }, [open, isLoad, setIsLoad]);

  const handleToggle = () => {
    setIsToggle(false);
  };

  return (
    <BrowserRouter>
      <Wrapper open={open}>
        <>
          {open && !isLoad && (
            <Routes>
              <Route path="logout" element={<Logout />} />
              {token === null ? (
                <>
                  <Route path="auth" element={<OnBoard />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          )}
          {open && isLoad && <Loading />}
        </>
      </Wrapper>
      {isToggle && !open && (
        <FloatingDialog open={isToggle} onClick={handleToggle} />
      )}
      {!open && <FloatingButton open={open} onClick={handleChange} />}
    </BrowserRouter>
  );
};

export default App;
