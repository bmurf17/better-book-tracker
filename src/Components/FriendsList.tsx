import { useEffect, useState } from "react";
import { AddFriend } from "./AddFriend";
import { AddFriendDialog } from "./AddFriendDialog";
import { SiteUser } from "../types/bookType";
import {
  Avatar,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { loadFriends } from "../functions/LoadUser";

interface Props {
  theUser: SiteUser | undefined;
}

export function FriendsList(props: Props) {
  const { theUser } = props;
  const [friends, setFriends] = useState<SiteUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = loadFriends(
      theUser || { id: "", friends: [], name: "", profileImg: "", uid: "" },
      setFriends
    );
    setLoading(false);

    return () => {
      unsub();
    };
  }, [theUser, reload]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="App-background">
          {theUser ? (
            <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
              <List
                dense
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  paddingTop: 2,
                }}
              >
                <AddFriend setOpen={setOpen} />
                {friends.map((friend) => {
                  return (
                    <Link
                      key={friend.uid}
                      to={"/Friends/" + friend.uid}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        padding: 12,
                      }}
                    >
                      <ListItem key={friend.uid} disablePadding>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ width: 56, height: 56 }}
                              alt={`Avatar n°${friend.name + 1}`}
                              src={friend.profileImg}
                            />
                          </ListItemAvatar>
                          <Typography sx={{ paddingLeft: 2 }}>
                            {friend.name}
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Container>
          ) : (
            <div className="App-header">
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  padding: 12,
                }}
              >
                <Typography variant="h3">
                  Please Login To View Friends
                </Typography>
              </Link>
            </div>
          )}
        </div>
      )}

      <AddFriendDialog
        key={theUser?.uid}
        theUser={theUser}
        setOpen={setOpen}
        open={open}
        setLoading={setReload}
      />
    </>
  );
}
