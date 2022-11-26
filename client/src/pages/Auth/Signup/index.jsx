import {
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignupStyles from "./signup.styles";
import { registerUser, useTypes } from "../../../api/users";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const { data: typesData } = useTypes();
  const classes = useSignupStyles();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(false);
  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
    email: "",
    file: "",
    type_id: "637204e8fe9899496361d153",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    file: "",
    type_id: "",
  });

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    const registrationResponse = await registerUser({ ...fields });
    console.log(registrationResponse);
    if (!registrationResponse?.data?.errors?.length) {
      setErrors((prevErrors) =>
        Object.keys(prevErrors).reduce((accum, errorKey) => {
          console.log(errorKey);
          accum[errorKey] = "";
          return accum;
        }, prevErrors)
      );
      console.log(errors);
      setSnackbar(true);
      setFields((prevFields) =>
        Object.keys(prevFields).reduce((accum, fieldKey) => {
          accum[fieldKey] = "";
          return accum;
        }, prevFields)
      );
      return;
    }

    const allErrors = registrationResponse.data.errors.reduce(
      (accum, { field, error }) => {
        return { ...accum, [field]: error };
      },
      {}
    );

    setErrors((prev) => ({ ...prev, ...allErrors }));
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const val = name === "file" ? event.target.files[0] : value;
    console.log(val);
    setFields((fields) => ({
      ...fields,
      [name]: val,
    }));
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
          navigate("/login");
        }}
      >
        <Alert
          onClose={() => {
            setSnackbar(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully submitted request!
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
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/logos/mainbg.jpg)`,
          // backgroundPosition: "center",
          backgroundSize: "cover",
          boxShadow: "rgb(255 140 0 / 28%) 0px 0px 0px 2000px inset",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form onSubmit={handleRegisterUser}>
          <Grid
            container
            direction="column"
            gap={1}
            width={300}
            className={classes.grid}
          >
            <Grid item container flex={1} sx={{ height: "fit-content" }}>
              <Typography variant="body1">Signup</Typography>
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Type of User
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="type_id"
                      value={fields.type_id}
                      label="Type of User"
                      onChange={handleFieldChange}
                    >
                      {typesData?.types?.map(({ _id, description }) => (
                        <MenuItem key={_id} value={_id}>
                          {description}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item width="100%">
                  <TextField
                    required
                    value={fields.first_name}
                    error={errors.first_name}
                    helperText={errors.first_name}
                    name="first_name"
                    onChange={handleFieldChange}
                    label="First Name"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item width="100%">
                  <TextField
                    required
                    value={fields.last_name}
                    error={errors.last_name}
                    helperText={errors.last_name}
                    name="last_name"
                    onChange={handleFieldChange}
                    label="Surname"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item width="100%">
                  <TextField
                    required
                    value={fields.username}
                    error={errors.username}
                    helperText={errors.username}
                    name="username"
                    onChange={handleFieldChange}
                    label="Username"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item width="100%">
                  <TextField
                    required
                    type="password"
                    value={fields.password}
                    error={errors.password}
                    helperText={errors.password}
                    onChange={handleFieldChange}
                    name="password"
                    label="Password"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item width="100%">
                  <TextField
                    type="password"
                    value={fields.password2}
                    error={errors.password2}
                    helperText={errors.password2}
                    onChange={handleFieldChange}
                    name="password2"
                    label="Re-type Password"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item width="100%">
                  <TextField
                    type="email"
                    label="Email"
                    variant="filled"
                    fullWidth
                    value={fields.email}
                    error={errors.email}
                    helperText={errors.email}
                    name="email"
                    onChange={handleFieldChange}
                  />
                </Grid>
                <Grid
                  item
                  width="100%"
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <Typography component="label" htmlFor variant="caption">Attachment</Typography> */}
                  {/* <IconButton color="primary" component="label">
                  <input id="file" type="file" accept="image/*" hidden />
                  <AttachFileIcon fontSize="medium" label />
                </IconButton>
                <InputLabel htmlFor="file">
                  <Typography variant="caption">Attachment</Typography>
                </InputLabel> */}
                  <input
                    type="file"
                    name="file"
                    className={classes.uploadInput}
                    onChange={handleFieldChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={1}>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  // onClick={() => {
                  //   // navigate("/signup");
                  //   handleRegisterUser();
                  // }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Signup;
