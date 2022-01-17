import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import { User } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import { SiteUser } from "../types/bookType";
import { AddFriend } from "./AddFriend";

interface Props {
  user: User | null;
}

export function FriendsList(props: Props) {
  const { user } = props;
  const [friends, setFriends] = useState<SiteUser[]>([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (user) {
        const usersCollectionRef = collection(db, "users");

        const q = query(usersCollectionRef, where("uid", "==", user?.uid));

        const querySnapshot = await getDocs(q);

        querySnapshot.docs.map(async (doc) => {
          const q2 = query(
            usersCollectionRef,
            where("uid", "==", doc.data().friends[0])
          );
          const theFriendData = await getDocs(q2);

          const friendList = theFriendData.docs.map((doc) => {
            const theFriend: SiteUser = {
              friends: doc.data().friends,
              name: doc.data().name,
              profileImg: doc.data().profileImg,
              uid: doc.data().uid,
            };
            console.log(theFriend);
            return theFriend;
          });

          setFriends(friendList);
        });
      }
    };

    getCurrentUser();
  }, [user]);

  return (
    <div className="App-background">
      <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
        <List
          dense
          sx={{ width: "100%", bgcolor: "background.paper", paddingTop: 2 }}
        >
          <AddFriend />
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
                        alt={`Avatar n°${friend.uid + 1}`}
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
    </div>
  );
}
