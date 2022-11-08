import { createTheme } from "@mui/material/styles";

const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#76549A",
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
