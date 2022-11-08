import "./App.css";
import { ThemeProvider } from "@mui/material/styles";

// User Imports
import themeOptions from "./themeOptions";
// components
import Layout from "./components/Layout";
import React from "react";
import Login from "./pages/Auth/Login";
import { useAuthContext } from "./context/Auth";

function App() {
  const value = useAuthContext();
  return (
    <ThemeProvider theme={themeOptions}>
      <React.Fragment>{!value.user ? <Login /> : <Layout />}</React.Fragment>
    </ThemeProvider>
  );
}

export default App;
