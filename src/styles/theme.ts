import { createTheme } from "@mui/material/styles";

const mainTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#EB1C24",
      dark: "#000000",
    },
    secondary: {
      main: "#929497",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default mainTheme;
