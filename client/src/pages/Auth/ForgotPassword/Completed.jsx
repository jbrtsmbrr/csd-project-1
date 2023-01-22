import { Typography } from "@mui/material";
import React from "react";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";

const Completed = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <VerifiedSharpIcon
        fontSize="large"
        sx={{ fontSize: "5rem" }}
        color="success"
      />
      <Typography variant="h2" fontWeight={600}>
        SUCCESSFUL!
      </Typography>
      <Typography variant="body2">
        Next step! Kindly click the forgot password link we sent to your email.
      </Typography>
    </div>
  );
};

export default Completed;
