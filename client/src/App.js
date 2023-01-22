import { Routes, Route } from "react-router-dom";
import "./App.css";

// components
import Layout from "./components/Layout";
import React from "react";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Projects from "./pages/Projects";
import ViewProject from "./pages/Projects/View";
import AssignedProjects from "./pages/AssignedProjects";
import Protected from "./components/Routes/Protected";
import Admin from "./pages/Admin";
import Users from "./pages/Admin/Users";
import Dashboard from "./pages/Dashboard";
import MostView from "./pages/Dashboard/MostView";
import MostRated from "./pages/Dashboard/MostRated";
import User from "./pages/User";
import OTP from "./pages/Auth/OTP";
import Completed from "./pages/Auth/OTP/Completed";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ForgotPasswordCompleted from "./pages/Auth/ForgotPassword/Completed";
import ChangePassword from "./pages/Auth/ForgotPassword/ChangePassword";
import ChangePasswordCompleted from "./pages/Auth/ForgotPassword/ChangePassword/Completed";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="verify" element={<OTP />} />
      <Route path="verify/completed" element={<Completed />} />
      <Route path="forgot_password" element={<ForgotPassword />} />
      <Route
        path="forgot_password/completed"
        element={<ForgotPasswordCompleted />}
      />
      <Route path="change_password" element={<ChangePassword />} />
      <Route
        path="change_password/completed"
        element={<ChangePasswordCompleted />}
      />
      <Route path="/" element={<Layout />}>
        {/* <Route element={<Protected />}> */}
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ViewProject />} />
        {/* </Route> */}
        <Route path="assigned" element={<AssignedProjects />} />
        <Route path="*" element={<div>404</div>}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Users />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<MostView />} />
          <Route path="most_view" element={<MostView />} />
          <Route path="most_rated" element={<MostRated />} />
        </Route>
        <Route path="user" element={<User />} />
      </Route>
      <Route path="/" element={<div>404</div>}></Route>
    </Routes>
  );
}

export default App;
