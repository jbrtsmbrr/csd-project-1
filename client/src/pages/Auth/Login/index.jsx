import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../../context/Auth";
import useLoginStyles from "./login.styles";

const Login = () => {
  const classes = useLoginStyles();
  const { login } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    const response = login(username, password);

    if (response) alert(response.error);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        gap={1}
        width={300}
        className={classes.grid}
      >
        <Grid item container flex={1}>
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                label="Password"
                variant="filled"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="outlined" fullWidth onClick={onSignIn}>
              Sign In
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Button variant="contained" fullWidth>
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <Button fullWidth>Continue as Guest</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
