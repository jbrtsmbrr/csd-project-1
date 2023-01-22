import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PsychologyTwoTone } from "@mui/icons-material";
import axios from "axios";

const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const submit = async (email) => {
    if (!email) return setError("Email address is required.");

    setLoading(true);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/forgot_password`,
      { email }
    );
    if (response.data?.error) {
      setError(response.data?.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    setError("");

    return response.data;
  };
  return [submit, { loading, error }];
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [submitForm, { loading, error }] = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm(email).then((data) => {
      if (data) {
        navigate("completed");
      }
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          //   textAlign: "center",
        }}
      >
        <PsychologyTwoTone sx={{ alignSelf: "center", fontSize: 200 }} />
        <div>
          <Typography variant="h4">Forgot your password?</Typography>
          <Typography variant="body2">
            Enter your email address to update your password.
          </Typography>
        </div>
        <TextField
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          variant="filled"
          fullWidth
          error={error}
          helperText={error}
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? "Sending reset link..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
