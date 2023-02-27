import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";
import SideNav from "./SideNav";

const Admin = () => {
  const { user } = useAuthContext();
  return user?.role?.description !== "Admin" ? (
    <div>404</div>
  ) : (
    <Grid
      container
      gap="1rem"
      style={{
        boxSizing: "border-box",
        minHeight: "90vh",
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/main.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid item flexBasis="15%">
        <SideNav />
      </Grid>
      <Grid item flex={1}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Admin;
