import { Button, Paper, TextField, Typography } from "@mui/material";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Code from "./Code";
import { useState } from "react";
import { resendOTP, useOTP } from "../../../api/users";

const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - last < delay) return;
    last = now;
    fn(...args);
  };
};

const OTP = () => {
  const [urlParams] = useSearchParams();
  const email = urlParams.get("email");
  const [code, setCode] = useState();
  const [verify, { loading, error }] = useOTP();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    verify({ otp: code, email }).then((response) => {
      if (response) if (!response?.data?.error) navigate("completed");
    });
  };

  const resend = () => {
    resendOTP(email);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/main.jpg)`,
      }}
    >
      <Paper
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "30vw",
          textAlign: "center",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <VerifiedUserTwoToneIcon
          sx={{ alignSelf: "center", fontSize: "5rem" }}
        />
        <Typography variant="h5" fontWeight={600}>
          Authenticate Your Account
        </Typography>
        <div>
          <Typography variant="body1">
            Please confirm your account by entering your authorization code sent
            to
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {email}
          </Typography>
        </div>
        <Code
          codeLength={6}
          value={code}
          onChange={(newCode) => {
            setCode(newCode);
          }}
        />
        <Typography variant="body1" color="red">
          {error}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "1rem",
            textAlign: "left",
          }}
        >
          <div>
            <Typography variant="body1">
              It may take a minute to receive your code.
            </Typography>
            <Typography variant="body1">
              Haven't receive it?{" "}
              <Button
                size="small"
                style={{
                  textTransform: "capitalize",
                  fontSize: "inherit",
                  fontWeight: 600,
                  textDecoration: "underline",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={throttle(resend, 3000)}
              >
                Resend a new code.
              </Button>
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              disabled={loading}
              sx={{ minWidth: 100 }}
              onClick={handleSubmit}
            >
              {loading ? `Loading...` : `Submit`}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default OTP;
