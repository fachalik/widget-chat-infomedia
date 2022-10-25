import { createTheme } from "@mui/material/styles";

const mainTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2D2D2D",
      dark: "#000000",
    },
    secondary: {
      main: "#F3F3F3",
    },
  },
  typography: {
    fontFamily: ["Sora", "sans-serif"].join(","),
  },
});

export default mainTheme;
