import { makeStyles } from "@mui/styles";

const useViewProjectStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  wrapper: {
    position: "relative",
    width: "100vw",
    height: "80vh",
    display: "flex",
    gap: "1rem",
    // padding: "1rem",
    boxSizing: "border-box",
  },
  imagesContainer: { flex: 1, display: "flex", gap: "1rem" },
  images: { position: "relative", flexBasis: "12%" },
  imagesWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  image: {
    objectFit: "contain",
    minHeight: "85px",
    cursor: "pointer",
    border: "2px solid transparent",
    // "&:first-child": {
    //   border: "2px solid",
    //   borderColor: theme.palette.primary.main
    // },
  },
  selectedImage: { flexBasis: "88%", "& > img": { border: "none !important" } },
  selectedImageItem: {
    borderColor: theme.palette.primary.main,
  },
}));

export default useViewProjectStyles;
