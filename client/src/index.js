import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material/styles";
import themeOptions from "./themeOptions";
import AuthProvider from "./context/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={themeOptions}>
        <Router>
          <AuthProvider>
            {/* <React.Fragment> */}
            <App />
            {/* </React.Fragment> */}
            {/* <React.Fragment>{!value.user ? <Login /> : <Layout />}</React.Fragment> */}
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </SWRConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
