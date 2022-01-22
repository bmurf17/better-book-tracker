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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import { SiteUser } from "../types/bookType";
import { AddFriend } from "./AddFriend";
import { AddFriendDialog } from "./AddFriendDialog";

interface Props {
  theUser: SiteUser | undefined;
}

export function FriendsList(props: Props) {
  const { theUser } = props;
  const [friends, setFriends] = useState<SiteUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCurrentUser = async () => {
      if (theUser) {
        const usersCollectionRef = collection(db, "users");

        const q = query(usersCollectionRef, where("uid", "==", theUser?.uid));

        //get the current user
        const querySnapshot = await getDocs(q);

        const arrayOfFriendUids: string[] =
          querySnapshot.docs[0].data().friends;

        const temp = await Promise.all(
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

        setFriends(temp);
      }
    };
    getCurrentUser();
    setLoading(false);
  }, [theUser, loading]);

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
            <p>Please login</p>
          )}
        </div>
      )}

      <AddFriendDialog
        theUser={theUser}
        setOpen={setOpen}
        open={open}
        setLoading={setLoading}
      />
    </div>
  );
}
