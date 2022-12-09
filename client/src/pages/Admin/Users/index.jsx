import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import {
  PersonAddAlt1,
  FactCheck,
  DocumentScanner as ViewDocumentIcon,
  PersonAddDisabled,
} from "@mui/icons-material";
import { useUsers } from "../../../api/users";
import { useSWRConfig } from "swr";
import axios from "axios";
import Cookies from "js-cookie";

export default function Users() {
  const { mutate } = useSWRConfig();
  const { data } = useUsers();

  const updateStatus = (user) => {
    const token = Cookies.get("token");
    if (token)
      mutate(
        `${process.env.REACT_APP_BASE_URL}/user/list`,
        async (currentData) => {
          const { users = [] } = currentData;

          const updatedUser = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/user/update_status`,
            {
              user: user._id,
              status: user.status === "pending" ? "approved" : "pending",
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          const updatedList = users.map((currentUser) => {
            if (currentUser._id === user._id) {
              return updatedUser;
            }

            return currentUser;
          });
          return updatedList;
        }
      );
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h5" fontWeight={600} marginBottom="1rem">
        Users
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ minWidth: "100%", maxWidth: "100%" }}
      >
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              {/* <TableCell>Project</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((row, index) => {
              if (row.role.description === "Admin") {
                return null;
              }
              return (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {row.first_name} {row.last_name}
                    </Typography>
                    <Typography variant="body2">{row.email}</Typography>
                  </TableCell>
                  <TableCell>{row?.type?.description}</TableCell>
                  {/* <TableCell>
                <Typography variant="subtitle2">Capstone Title</Typography>
                <Rating readOnly defaultValue={index} />
              </TableCell> */}
                  <TableCell>
                    <Chip
                      label={row.status}
                      sx={{ width: "fit-content", textTransform: "capitalize" }}
                      size="small"
                      color={row.status === "pending" ? "info" : "warning"}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={row.status === "pending" ? "Approve" : "Revoke"}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          updateStatus(row);
                        }}
                      >
                        {row.status === "pending" ? (
                          <PersonAddAlt1 />
                        ) : (
                          <PersonAddDisabled />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Documents in other tab">
                      <IconButton
                        onClick={() => {
                          window.open(row.attachment);
                        }}
                      >
                        <ViewDocumentIcon />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="View Attachment">
                    <IconButton size="small">
                      <PersonAddDisabled />
                    </IconButton>
                  </Tooltip> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
