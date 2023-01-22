import { createTheme } from "@mui/material/styles";

const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      // main: "#718096",
      main: "#000000d9",
      contrastText: "white"
    },
    secondary: {
      main: "#789a54",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontSize: 12,
    // fontFamily: "Source Sans Pro",
  },
});

export default themeOptions;
