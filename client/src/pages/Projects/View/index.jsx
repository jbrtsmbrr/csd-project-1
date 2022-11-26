import {
  Chip,
  Divider,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Star as StarIcon,
  DocumentScanner as ViewDocumentIcon,
} from "@mui/icons-material";
import useViewProjectStyles from "./view.styles";
import Comments from "./Comments";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  optimisticUpdateProject,
  optimisticUpdateProjects,
  useProject,
  useProjects,
} from "../../../api/projects";
import { getComputedRating, getCurrentUserRate, syncRatingLocally } from "..";
import Cookies from "js-cookie";
import { useAuthContext } from "../../../context/Auth";
import axios from "axios";

const View = () => {
  const { id: project_id } = useParams();
  const { user } = useAuthContext();
  const { data: allProjects } = useProjects();
  const { data, error } = useProject(project_id);
  const classes = useViewProjectStyles();
  const [selectedImage, setSelectedImage] = useState(0);
  const images = data?.capstone?.images?.map((image, index) => {
    return (
      <img
        src={image}
        alt="logo"
        height="100%"
        width="100%"
        className={`${classes.image} ${
          selectedImage === index && classes.selectedImageItem
        }`}
        onClick={() => {
          setSelectedImage(index);
        }}
      />
    );
  });
  if (error || !data) {
    return <div>loading...</div>;
  }

  const { totalRating, count: ratingCount } = getComputedRating(
    data.capstone.ratings
  );

  const handleRatingChange = (_, rating) => {
    const token = Cookies.get("token");
    if (token) {
      const [selectedProject, updatedCapstones] = syncRatingLocally({
        capstones: allProjects?.capstones,
        user,
        rating,
        project_id,
      });
      optimisticUpdateProjects(updatedCapstones, {
        user: user?._id,
        token,
        project_id,
        rating,
      });
      optimisticUpdateProject(selectedProject, {
        user: user?._id,
        token,
        rating,
      });
      // axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/capstone/update/rating`,
      //   {
      //     id: project_id,
      //     user: user._id,
      //     rating,
      //   },
      //   {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   }
      // );
    }
  };

  const currentUserRate = getCurrentUserRate(user?._id, data.capstone.ratings);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.imagesContainer}>
          <div className={classes.images}>
            <div className={classes.imagesWrapper}>
              {images.map((image) => {
                return image;
              })}
            </div>
          </div>
          <div className={classes.selectedImage}>
            {images.length && images[selectedImage]}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                {data.capstone.title}
              </Typography>
              {user && (
                <Tooltip title="View Documents in other tab">
                  <IconButton
                    onClick={() => {
                      window.open(data.capstone.documents);
                    }}
                  >
                    <ViewDocumentIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <Typography variant="body2">
              {data.capstone.percentage}% Done (Approved by Prof.{" "}
              {data.capstone.approver.first_name}{" "}
              {data.capstone.approver.last_name})
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography component="span" variant="subtitle2">
                {totalRating}
              </Typography>
              <StarIcon
                size="small"
                style={{ color: "#FFAB00", transform: "translateY(-2px)" }}
                fontSize="1rem"
              />
              <Typography component="span" variant="subtitle2">
                ({ratingCount} Reviews)
              </Typography>
            </div>
          </div>
          {/* <div>
            <Chip label="Top 2 Rated 🏆" />
          </div> */}
          <div style={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Details
            </Typography>
            <Typography variant="body2">{data.capstone.description}</Typography>
          </div>
          <div>
            {user && (
              <React.Fragment>
                <Typography variant="subtitle1" fontWeight={600}>
                  Rate this App
                </Typography>
                <Rating
                  defaultValue={currentUserRate}
                  onChange={handleRatingChange}
                />
              </React.Fragment>
            )}
          </div>
          <div>
            <Typography variant="subtitle1" fontWeight={600}>
              Tags
            </Typography>
            {data.capstone.tags.map(({ description }) => (
              <Chip label={description} color="warning" />
            ))}
          </div>
        </div>
      </div>
      <Divider />
      <Comments comments={data.capstone.comments} project_id={project_id} />
    </div>
  );
};

export default View;
