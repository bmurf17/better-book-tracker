import { ListItem, ListItemButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddFriend(props: Props) {
  const { setOpen } = props;
  return (
    <ListItem
      disablePadding
      onClick={() => {
        setOpen(true);
      }}
    >
      <ListItemButton>
        <div className="App-paddingLeft">
          <AddIcon fontSize="large" />
        </div>
        <Typography sx={{ paddingLeft: 2 }}>Add Friends</Typography>
      </ListItemButton>
    </ListItem>
  );
}
