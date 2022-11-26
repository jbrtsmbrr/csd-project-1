import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ListSubheader } from "@mui/material";

export default function SelectedListItem() {
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
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
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
