import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";
import useLoginStyles from "./login.styles";

const Login = () => {
  const classes = useLoginStyles();
  const signInButtonRef = React.useRef(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const onSignIn = async () => {
    const error = await login(username, password);
    if (error) setSnackbar(true);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) navigate("/projects");
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar
        key={"snackbar--001"}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar}
        onClose={() => {
          setSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackbar(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          Login failed!
        </Alert>
      </Snackbar>
      {/* <div
        item
        style={{
          flex: 1,
          height: "100vh",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/logos/mainbg.jpg)`,
          // backgroundPosition: "center",
          backgroundSize: "cover",
          boxShadow: "rgb(255 140 0 / 28%) 0px 0px 0px 2000px inset",
          
        }}
      ></div> */}
      <div
        style={{
          flex: 1,
          position: "relative",
          height: "100vh",
          // backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/logos/mainbg.jpg)`,
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // boxShadow: "rgb(255 140 0 / 28%) 0px 0px 0px 2000px inset",
          // backgroundRepeat: "no-repeat",
          background: "#000000d9",
        }}
      >
        <Grid
          container
          direction="column"
          gap={1}
          width={300}
          classes={{
            root: classes.grid,
          }}
        >
          {/* <Grid item container alignItems="center" justifyContent="center">
          <img
            src="/assets/images/logos/csdlogo.png"
            height="40px"
            width="40px"
            alt="csd logo"
          />
        </Grid> */}
          <Grid item container flex={1} sx={{ height: "fit-content" }}>
            <Typography variant="body1">Login</Typography>
          </Grid>
          <Grid item container direction="column" spacing={1} flex={1}>
            <Grid
              item
              container
              direction="column"
              flex={1}
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item width="100%">
                <TextField
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  label="Username"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item width="100%">
                <TextField
                  type="password"
                  value={password}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      signInButtonRef.current.click();
                    }
                  }}
                  onChange={(event) => setPassword(event.target.value)}
                  label="Password"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item width="100%">
                <Button
                  onClick={() => {
                    navigate("/forgot_password");
                  }}
                >
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                ref={signInButtonRef}
                variant="outlined"
                fullWidth
                onClick={onSignIn}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                onClick={() => {
                  navigate("/projects");
                }}
              >
                Continue as Visitor
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
