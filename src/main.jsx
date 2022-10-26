import "./index.css";

import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import Theme from "./styles/theme";
ReactDOM.createRoot(document.getElementById("live-body-chat")).render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </>
  </React.StrictMode>
);
