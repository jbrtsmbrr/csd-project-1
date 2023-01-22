import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const useVerifyToken = () => {
  const [urlParams] = useSearchParams();
  const urlToken = urlParams.get("token") || "";

  try {
    var base64Url = urlToken.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const payload = JSON.parse(jsonPayload);
    return { ...payload, rawToken: urlToken };
  } catch {
    return { error: true };
  }
};

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const changePassword = async ({ password, token }) => {
    setLoading(true);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/update_password`,
      { password, token }
    );

    if (response.data?.error) {
      setError(response.data.error);
    }
    setLoading(false);

    return response;
  };

  return [changePassword, { loading, error }];
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    password1: "",
    password2: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    password1: "",
    password2: "",
  });
  const [changePassword, { error, loading }] = useChangePassword();
  const payload = useVerifyToken();
  if (payload?.error || !payload?.email) {
    return <div>Error!</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    const { password1, password2 } = fields;
    if (!password1)
      return setFieldErrors((prev) => ({
        ...prev,
        password1: "Please enter password.",
      }));
    if (!password2)
      return setFieldErrors((prev) => ({
        ...prev,
        password2: "Please enter confirm password.",
      }));

    if (password1 !== password2) {
      return setFieldErrors((prev) => ({
        ...prev,
        password2: "Password and Confirm Password field doesn't match.",
      }));
    }

    const response = await changePassword({
      password: password1,
      token: payload.rawToken,
    });
    if (!response?.data?.error) {
      navigate("completed");
    }
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
        style={{
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          //   textAlign: "center",
        }}
      >
        {/* <PsychologyTwoTone sx={{ alignSelf: "center", fontSize: 200 }} /> */}
        <div>
          <Typography variant="h4">Forgot your password?</Typography>
          <Typography variant="body2">
            Enter your email address to update your password.
          </Typography>
        </div>
        <TextField
          required
          type="password"
          value={fields.password1}
          name="password1"
          onChange={handleChange}
          label="Password"
          variant="filled"
          fullWidth
          error={fieldErrors.password1}
          helperText={fieldErrors.password1}
        />
        <TextField
          required
          type="password"
          value={fields.password2}
          name="password2"
          onChange={handleChange}
          label="Confirm Password"
          variant="filled"
          fullWidth
          error={fieldErrors.password2}
          helperText={fieldErrors.password2}
        />
        {error && (
          <Typography variant="body2" color="red">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Changing password..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
