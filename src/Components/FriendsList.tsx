import { useEffect, useState } from "react";
import { AddFriend } from "./AddFriend";
import { AddFriendDialog } from "./AddFriendDialog";
import { SiteUser } from "../types/bookType";
import { db } from "../firebase.config";
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
import { query, collection, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

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
    const getCurrentUser = async () => {
      setLoading(true);
      if (theUser) {
        const usersCollectionRef = collection(db, "users");

        const q = query(usersCollectionRef, where("uid", "==", theUser?.uid));

        //get the current user
        const querySnapshot = await getDocs(q);

        const arrayOfFriendUids: string[] =
          querySnapshot.docs[0].data().friends;

        const friendList = await Promise.all(
          arrayOfFriendUids.map(async (uid) => {
            const q2 = query(usersCollectionRef, where("uid", "==", uid));
            const querySnapshot2 = await getDocs(q2);
            const data = querySnapshot2.docs[0].data();
            const theFriend: SiteUser = {
              name: data.name,
              profileImg: data.profileImg,
              friends: data.friends,
              uid: data.uid,
            };
            return theFriend;
          })
        );
        setFriends(friendList);
      }
      setLoading(false);
    };
    getCurrentUser();
  }, [theUser, reload]);

  return (
    <div>
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
        theUser={theUser}
        setOpen={setOpen}
        open={open}
        setLoading={setReload}
      />
    </div>
  );
}
