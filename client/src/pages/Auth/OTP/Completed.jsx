import { Button, Typography } from "@mui/material";
import React from "react";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();
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
        VERIFIED!
      </Typography>
      <Typography variant="body2">
        Thank you for verifying you account
      </Typography>
      <Button onClick={() => navigate("/login")}>Proceed to login</Button>
    </div>
  );
};

export default Completed;
