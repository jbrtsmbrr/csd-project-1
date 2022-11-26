import { Routes, Route } from "react-router-dom";
import "./App.css";

// components
import Layout from "./components/Layout";
import React from "react";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Projects from "./pages/Projects";
import ViewProject from "./pages/Projects/View";
import Protected from "./components/Routes/Protected";
import Admin from "./pages/Admin";
import Users from "./pages/Admin/Users";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<Layout />}>
        {/* <Route element={<Protected />}> */}
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ViewProject />} />
        {/* </Route> */}
        <Route path="*" element={<div>404</div>}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Users />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
      <Route path="/" element={<div>404</div>}></Route>
    </Routes>
  );
}

export default App;
