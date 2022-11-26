import { Chip, Divider, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useAuthContext } from "../../../context/Auth";
import axios from "axios";
import { Link } from "react-router-dom";

const Comments = ({ project_id }) => {
  const [comment, setComment] = useState("");
  const { mutate } = useSWRConfig();
  const { user } = useAuthContext();
  const token = Cookies.get("token");
  const response = useSWR(
    `${process.env.REACT_APP_BASE_URL}/capstone/comments/${project_id}`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const d = await res.data;
      return d;
    }
  );

  const add_comment = () => {
    const optimisticData = {
      ...response.data,
      comments: [
        { user, comment, timestamp: "2022-11-23T13:59:32.579Z" },
        ...response.data.comments,
      ],
    };
    const options = {
      optimisticData: optimisticData,
      rollbackOnError: true,
      // revalidate: false,
    };
    mutate(
      `${process.env.REACT_APP_BASE_URL}/capstone/comments/${project_id}`,
      async () => {
        axios.post(
          `${process.env.REACT_APP_BASE_URL}/capstone/add/comment`,
          {
            user: user._id,
            id: project_id,
            comment,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return;
      },
      options
      // { revalidate: false }
    );
  };

  // if (response.error || !response.data) return <div>loading...</div>;

  return (
    <div
      style={{
        padding: "2rem",
        width: "50%",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <Typography variant="h6" fontWeight={600}>
          Comments
        </Typography>
        {!user ? (
          <Link to="/signup">
            <Typography>Register to add comment</Typography>
          </Link>
        ) : (
          <TextField
            variant="filled"
            fullWidth
            placeholder="Add a public comment"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                // setComments((currentComments) => [
                //   { name: "Jane Doe", content: comment },
                //   ...currentComments,
                // ]);
                add_comment();
                setComment("");
              }
            }}
          />
        )}
      </div>
      <div
        style={{
          minHeight: 300,
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        {response?.data?.comments?.map((comment) => (
          <React.Fragment>
            <div style={{ display: "flex", gap: "1rem", marginBlock: "1rem" }}>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logos/logo.png`}
                  alt="logo"
                  height="50px"
                  width="50px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  {comment.user.first_name} {comment.user.last_name}
                </Typography>
                {/* <Chip label="Thesis Exhibit 77" variant="filled" size="small" /> */}
                <Typography variant="body2">{comment.comment}</Typography>
              </div>
            </div>
            <Divider />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Comments;
