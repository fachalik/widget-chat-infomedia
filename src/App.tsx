import { BrowserRouter, Route, Routes } from "react-router-dom";

import FloatingButton from "./components/FloatingButton";
import Home from "./pages/Home";
import Login from "./pages/Login";
import useOpen from "./store/widget-open";

const App = () => {
  const { open, setOpen } = useOpen((state) => state);
  const handleChange = () => {
    setOpen();
    window.parent.postMessage(open ? "hide" : "show", "*");
  };
  return (
    <BrowserRouter>
      {open && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      )}
      {!open && <FloatingButton open={open} onClick={handleChange} />}
    </BrowserRouter>
  );
};

export default App;
