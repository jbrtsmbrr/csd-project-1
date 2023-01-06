import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { updateUser, useProfessors } from "../../api/users";
import { useAuthContext } from "../../context/Auth";

const User = () => {
  const { data: professorData } = useProfessors();
  const { user, updateUserInfo } = useAuthContext();
  const { first_name, last_name, email, username, professor } = user;

  const [fields, setFields] = useState({
    professor_id: professor?._id || "",
    username,
    first_name,
    last_name,
    email,
  });

  const [errors, setErrors] = useState({
    professor_id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fieldErrors = {};

    for (const [key, val] of Object.entries(fields)) {
      if (key === "professor_id" && user.type.description === "Professor") {
        continue;
      }
      if (!val) {
        fieldErrors[key] = "This field is required.";
      }
    }

    if (Object.keys(fieldErrors).length) {
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return;
    }

    // (async () => {
    const response = await updateUser({
      id: user._id,
      ...fields,
    });
    const { errors, data } = await response.data;
    if (errors) {
      const reponseErrors = errors?.reduce((accum, error) => {
        accum[error.field] = error.error;
        return accum;
      }, {});
      setErrors((prev) => {
        return { ...prev, ...reponseErrors };
      });
    } else {
      setErrors({
        professor_id: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
      });
      updateUserInfo(data.user);
      setSnackbar(true);
    }

    // })();
  };
  const [snackbar, setSnackbar] = useState(false);

  if (user.role.description === "Admin") return <div>401 - Unauthorized</div>;
  return (
    <div style={{ padding: "1rem" }}>
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
          severity="success"
          sx={{ width: "100%" }}
        >
          User information updated successfully
        </Alert>
      </Snackbar>
      <Typography variant="body1" marginY={1}>
        User Information
      </Typography>
      <Paper elevation={3} sx={{ padding: "1rem", width: "50%" }}>
        <form onSubmit={handleSubmit}>
          <Grid container gap={1} direction="column">
            {professor && (
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="select-professor">
                    Assign Professor
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="select-professor"
                    id="demo-simple-select"
                    name="professor_id"
                    value={fields.professor_id}
                    placeholder="Select Professor"
                    label="Assign Professor"
                    onChange={handleChange}
                    defaultValue={""}
                    required
                  >
                    <MenuItem disabled value={""}>
                      Select Professor
                    </MenuItem>
                    {professorData?.professors?.map(({ _id, description }) => (
                      <MenuItem key={_id} value={_id}>
                        {description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  name="first_name"
                  value={fields.first_name}
                  variant="filled"
                  size="small"
                  label="First Name"
                  placeholder="Enter first name here"
                  error={errors.first_name}
                  helperText={errors.first_name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  name="last_name"
                  value={fields.last_name}
                  variant="filled"
                  size="small"
                  label="Last Name"
                  placeholder="Enter last name here"
                  error={errors.last_name}
                  helperText={errors.last_name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  name="username"
                  value={fields.username}
                  variant="filled"
                  size="small"
                  label="Username"
                  placeholder="Enter first name here"
                  error={errors.username}
                  helperText={errors.username}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                value={fields.email}
                error={errors.email}
                helperText={errors.email}
                name="email"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginY: 1 }}
          >
            Update Information
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default User;
