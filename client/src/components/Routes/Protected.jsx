import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";

const Protected = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const currentLocation = location?.pathname || "";
  const pages = {
    projects: ["Bret", "Jane"],
    undefined: [],
  };

  const rawLocation = currentLocation.replaceAll("/", "");
  const currentPage = pages[rawLocation];
  const allowed = currentPage.includes(user?.username);

  return (
    <React.Fragment>{allowed ? <Outlet /> : <div>404</div>}</React.Fragment>
  );
};

export default Protected;
