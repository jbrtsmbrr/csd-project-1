import { Routes, Route } from "react-router-dom";
import "./App.css";

// components
import Layout from "./components/Layout";
import React from "react";
import Login from "./pages/Auth/Login";
import Projects from "./pages/Projects";
import Protected from "./components/Routes/Protected";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Layout />}>
        <Route element={<Protected />}>
          <Route path="projects" element={<Projects />} />
        </Route>
        <Route path="*" element={<div>404</div>}></Route>
      </Route>
      <Route path="/" element={<div>404</div>}></Route>
    </Routes>
  );
}

export default App;
