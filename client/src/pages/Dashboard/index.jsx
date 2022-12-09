import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const Dashboard = () => {
  return (
    <Grid container gap="1rem">
      <Grid item flexBasis="15%">
        <SideNav />
      </Grid>
      <Grid
        item
        flex={1}
        style={{ height: "calc(100vh - 10vh)", position: "relative" }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
