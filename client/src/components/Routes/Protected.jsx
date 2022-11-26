import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";

const Protected = () => {
  const { user } = useAuthContext();

  return (
    <React.Fragment>{user ? <Outlet /> : <div>404</div>}</React.Fragment>
  );
};

export default Protected;
