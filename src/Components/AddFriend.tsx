import { ListItem, ListItemButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function AddFriend() {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <div className="App-paddingLeft">
          <AddIcon fontSize="large" />
        </div>
        <Typography sx={{ paddingLeft: 2 }}>Add Friends</Typography>
      </ListItemButton>
    </ListItem>
  );
}
