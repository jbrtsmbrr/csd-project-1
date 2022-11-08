import { makeStyles } from "@mui/styles";

const useLoginStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eee",
  },
  grid: {
    padding: 18,
    background: "white",
    boxShadow: "0px 0px 20px -14px #76549ab5",
    minHeight: 400,
    boxSizing: "border-box",
  },
});

export default useLoginStyles;
