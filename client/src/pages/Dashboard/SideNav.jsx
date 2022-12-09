import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
import { ListSubheader } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SelectedListItem() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        subheader={<ListSubheader>Navigation</ListSubheader>}
      >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
            navigate("most_view");
            handleListItemClick(event, 0);
          }}
        >
          <ListItemIcon>
            <RemoveRedEyeIcon />
          </ListItemIcon>
          <ListItemText primary="Most View" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => {
            navigate("most_rated");
            handleListItemClick(event, 1);
          }}
        >
          <ListItemIcon>
            <StarRateIcon />
          </ListItemIcon>
          <ListItemText primary="Most Rated" />
        </ListItemButton>
        {/* <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItemButton> */}
      </List>
    </Box>
  );
}
