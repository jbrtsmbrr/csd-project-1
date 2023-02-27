import { makeStyles } from "@mui/styles";

const useSignupStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "#eee",
  },
  login_container: {
    flex: 1,
  },
  grid: {
    padding: 18,
    background: "white",
    boxShadow: "0px 0px 20px -14px #76549ab5",
    minHeight: 400,
    boxSizing: "border-box",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  uploadInput: {
    // '&[type="file"]': {
    //   color: "#878787",
    // },
    color: theme.palette.primary.main,
    '&[type="file"]::-webkit-file-upload-button': {
      background: theme.palette.primary.main,
      borderRadius: 4,
      color: "#fff",
      cursor: "pointer",
      fontSize: "0.5rem",
      outline: "none",
      padding: "10px 25px",
      textTransform: "capitalized",
      border: "none",
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
    '&[type="file"]::-webkit-file-upload-button:hover': {
      background: "rgb(64,64,64)",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
}));

export default useSignupStyles;
