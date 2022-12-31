import {
  Chip,
  Divider,
  IconButton,
  Rating,
  Tooltip,
  Typography,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import {
  Star as StarIcon,
  DocumentScanner as ViewDocumentIcon,
  ThumbDownAlt as RejectIcon,
  ThumbUpAlt as ApproveIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import useViewProjectStyles from "./view.styles";
import Comments from "./Comments";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  optimisticUpdateChapter,
  optimisticUpdateProject,
  optimisticUpdateProjects,
  updateChapter,
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
  const { data, error, mutate } = useProject(project_id);
  const classes = useViewProjectStyles();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (data.percentage !== 100 && user.type.description !== "Professor")
    return <div>401 - Unauthorized</div>;

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
    <React.Fragment>
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
                  <Tooltip title="View Documents">
                    <IconButton
                      onClick={() => {
                        setIsModalOpen(true);
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
              <Typography variant="body2">
                {data.capstone.description}
              </Typography>
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
      <Modal
        open={isModalOpen}
        onClose={(_, reason) => {
          // if (reason && reason === "backdropClick" && reason === "escapeKeyDown") return;

          setIsModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thesis Chapters
          </Typography>
          <List dense>
            {data.capstone.documents.map(({ key, status, path }) => (
              <ListItem
                key={key}
                disabled={!status}
                secondaryAction={
                  <React.Fragment>
                    <IconButton edge="end" aria-label="view" disabled={!status}>
                      <a
                        href={path}
                        target="_blank"
                        style={{ color: "inherit", height: 20 }}
                      >
                        <ViewIcon />
                      </a>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="approve"
                      disabled={!status}
                      color={status === "approved" ? "primary" : "default"}
                      onClick={async () => {
                        // send a request to the API to update the data
                        await updateChapter({
                          project: data.capstone._id,
                          status: "approved",
                          chapter: key,
                        });
                        // update the local data immediately and revalidate (refetch)
                        // NOTE: key is not required when using useSWR's mutate as it's pre-bound
                        const newProject = {
                          ...data.capstone,
                          documents: data.capstone.documents.map((document) => {
                            if (key === document.key) {
                              return { ...document, status: "approved" };
                            }
                            return document;
                          }),
                        };

                        mutate(
                          { ...data, capstone: newProject },
                          { revalidate: false }
                        );
                      }}
                      // onClick={() => {
                      //   optimisticUpdateChapter({
                      //     allProjects: allProjects?.capstones,
                      //     project: data.capstone,
                      //     status: "approved",
                      //     chapter: key,
                      //   });
                      // }}
                    >
                      <ApproveIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="decline"
                      disabled={!status}
                      color={status === "declined" ? "primary" : "default"}
                      onClick={async () => {
                        // send a request to the API to update the data
                        await updateChapter({
                          project: data.capstone._id,
                          status: "declined",
                          chapter: key,
                        });
                        // update the local data immediately and revalidate (refetch)
                        // NOTE: key is not required when using useSWR's mutate as it's pre-bound
                        const newProject = {
                          ...data.capstone,
                          documents: data.capstone.documents.map((document) => {
                            if (key === document.key)
                              return { ...document, status: "declined" };
                            return document;
                          }),
                        };

                        mutate(
                          { ...data, capstone: newProject },
                          { revalidate: false }
                        );
                      }}
                      // onClick={() => {
                      //   optimisticUpdateChapter({
                      //     allProjects: allProjects?.capstones,
                      //     project: data.capstone,
                      //     status: "declined",
                      //     chapter: key,
                      //   });
                      // }}
                    >
                      <RejectIcon />
                    </IconButton>
                  </React.Fragment>
                }
              >
                <ListItemText
                  primary={key}
                  secondary={
                    status !== ""
                      ? `chapter-${key}.pdf`
                      : "Document for this chapter hasn't been uploaded"
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default View;
