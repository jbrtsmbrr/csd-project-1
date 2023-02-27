import React from "react";
import useSWR, { useSWRConfig } from "swr";
import { useAuthContext } from "../../context/Auth";
import {
  Typography,
  Card,
  Rating,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";

import {
  Launch as LaunchIcon,
  Star as StarIcon,
  ContentPasteSearch as ContentIcon,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  optimisticUpdateProject,
  optimisticUpdateProjects,
  updateRating,
  useAssignedProjects,
  useProjects,
} from "../../api/projects";
import axios from "axios";
import Cookies from "js-cookie";

export const getComputedRating = (ratings) => {
  const { rating, count } = ratings.reduce(
    (accum, curr) => {
      const { rating: r, count: c } = curr;
      accum.rating += r * c;
      accum.count += c;
      return accum;
    },
    { rating: 0, count: 0 }
  );

  const totalRating = (rating / count || 0).toFixed(1);

  return { totalRating, count };
};

export const getCurrentUserRate = (currentUser, ratings = []) => {
  let rateForCapstone = 0;
  if (!currentUser) return rateForCapstone;

  for (let rate of ratings) {
    if (rateForCapstone) break;

    rate.rate_by.forEach((by) => {
      if (by._id === currentUser) {
        rateForCapstone = rate.rating;
      }
    });
  }

  return rateForCapstone;
};

export const syncRatingLocally = ({
  capstones = [],
  project_id,
  user,
  rating,
}) => {
  let selectedProject;
  const updatedCapstones = capstones.map((capstone) => {
    if (capstone._id === project_id) {
      for (const rateIndex in capstone.ratings) {
        const filteredRate = capstone.ratings[rateIndex].rate_by.filter(
          (by) => {
            return by._id !== user._id;
          }
        );
        capstone.ratings[rateIndex].count = filteredRate.length;
        capstone.ratings[rateIndex].rate_by = filteredRate;

        if (rating === capstone.ratings[rateIndex].rating) {
          const { first_name, last_name, _id } = user;
          capstone.ratings[rateIndex].rate_by = [
            ...capstone.ratings[rateIndex].rate_by,
            { first_name, last_name, _id },
          ];
          capstone.ratings[rateIndex].count += 1;
        }
      }

      selectedProject = capstone;
    }

    return capstone;
  });

  return [selectedProject, updatedCapstones];
};

const Projects = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { user } = useAuthContext();
  const response = useAssignedProjects(user._id);

  const handleClick = (project_id) => {
    // Add website count
    const token = Cookies.get("token");
    if (token)
      axios.post(
        `${process.env.REACT_APP_BASE_URL}/capstone/update/views`,
        {
          id: project_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
  };

  const handleRatingChange = (project_id, rating) => {
    const token = Cookies.get("token");
    if (token) {
      const { capstones = [] } = response.data;
      const [selectedProject, updatedCapstones] = syncRatingLocally({
        capstones,
        project_id,
        user,
        rating,
      });

      optimisticUpdateProjects(updatedCapstones);

      optimisticUpdateProject(selectedProject, () => updateRating({
        user: user._id,
        rating,
        token,
        project_id
      }));
    }
  };

  if (user?.type?.description !== "Professor") return <div>404</div>;

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
          paddingBlock: 18,
          boxSizing: "border-box",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/main.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "90vh",
        }}
      >
        {response?.data?.capstones?.map((capstone) => {
          const {
            _id,
            title,
            description,
            images,
            tags,
            ratings,
            website,
            is_verified,
            approver,
          } = capstone;
          const currentUserRate = getCurrentUserRate(user?._id, ratings);
          const { totalRating, count } = getComputedRating(ratings);

          if (capstone?.approver?._id !== user._id) return null;

          return (
            <Card
              key={_id}
              elevation={5}
              style={{
                flexBasis: "32%",
                display: "flex",
                // alignItems: "center",
                alignItems: "stretch",
                boxShadow: "0px 4px 30px -10px #ddd",
                position: "relative",
                minHeight: 200,
                maxHeight: 300,
                // maxHeight: "auto",
                // height: 200,
                // padding: "1rem",
                // minHeight: "210px",
                // minWidth: "210px",
                // maxHeight: "210px",
                // maxWidth: "210px",
              }}
            >
              <div
                style={{
                  flexBasis: "40%",
                  position: "relative",
                  backgroundImage: `url(${images[0]})`,
                  objectFit: "contain",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    padding: "8px",
                  }}
                >
                  {tags.map(({ description }) => (
                    <Chip
                      size="small"
                      label={description}
                      style={{ marginRight: 8, background: "#000000d9" }}
                      color="warning"
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  flexBasis: "60%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ padding: 12, boxSizing: "border-box" }}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {is_verified && (
                      <Tooltip
                        title={`Verified by
                  ${approver.first_name}
                  ${approver.last_name}`}
                      >
                        <CheckCircle color="primary" fontSize="small" />
                      </Tooltip>
                    )}
                    <span>{title}</span>
                  </Typography>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <Typography component="span" variant="subtitle2">
                      {totalRating}
                    </Typography>
                    <StarIcon
                      size="small"
                      style={{
                        color: "#FFAB00",
                        transform: "translateY(-2px)",
                      }}
                      fontSize="1rem"
                    />
                    <Typography component="span" variant="subtitle2">
                      ({count} Reviews)
                    </Typography>
                  </div>
                </div>
                <div style={{ flex: 1, padding: 12, boxSizing: "border-box" }}>
                  <Typography
                    variant="subtitle2"
                    style={{ overflowY: "clip", maxHeight: "70px" }}
                  >
                    {description}
                  </Typography>
                </div>
                <div
                  style={{
                    background: "rgb(255 248 238)",
                    padding: 12,
                    boxSizing: "border-box",
                  }}
                >
                  {user && (
                    <React.Fragment>
                      <Typography /*component="span"*/ variant="subtitle2">
                        Rate this thesis
                      </Typography>
                      <Rating
                        size="small"
                        defaultValue={currentUserRate}
                        // precision={0.5}
                        onChange={(_, newValue) => {
                          handleRatingChange(_id, newValue);
                        }}
                        // readOnly
                      />
                    </React.Fragment>
                  )}

                  <div>
                    <Tooltip title="Launch in other tab">
                      <a
                        href={`${website}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleClick(_id)}
                      >
                        <IconButton>
                          <LaunchIcon />
                        </IconButton>
                      </a>
                    </Tooltip>
                    <Tooltip title="View full details">
                      <IconButton onClick={() => navigate(`/projects/${_id}`)}>
                        <ContentIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Card>
            // <Card key={title} sx={{ flexBasis: "33%" }}>
            //   <CardMedia
            //     component="img"
            //     height="140"
            //     image="https://via.placeholder.com/150/92c952"
            //     alt="green iguana"
            //   />
            //   <CardContent>
            //     <Typography gutterBottom variant="h5" component="div">
            //       Lizard
            //     </Typography>
            //     <Typography variant="body2" color="text.secondary">
            //       Lizards are a widespread group of squamate reptiles, with over
            //       6,000 species, ranging across all continents except Antarctica
            //     </Typography>
            //   </CardContent>
            //   <CardActions>
            //     <Button size="small">Share</Button>
            //     <Button size="small">Learn More</Button>
            //   </CardActions>
            // </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Projects;
