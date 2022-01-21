import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  ListItem,
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import CloseIcon from "@mui/icons-material/Close";
import { SiteUser } from "../types/bookType";

interface Props {
  theUser: SiteUser | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export function AddFriendDialog(props: Props) {
  const { theUser, setOpen, open } = props;
  const [possibleFriends, setPossibleFriends] = useState<SiteUser[]>([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const usersCollectionRef = collection(db, "users");

      const q = query(usersCollectionRef, where("uid", "!=", theUser?.uid));

      const querySnapshot = await getDocs(q);
      const friendList = querySnapshot.docs.map((doc) => {
        const theFriend: SiteUser = {
          id: doc.data().id,
          friends: doc.data().friends,
          name: doc.data().name,
          profileImg: doc.data().profileImg,
          uid: doc.data().uid,
        };
        return theFriend;
      });
      setPossibleFriends(friendList);
    };
    if (theUser) {
      getCurrentUser();
    }
  }, [theUser]);

  const onClose = () => {
    setOpen(false);
  };

  const addFriend = async (userID: string) => {
    console.log(theUser?.friends);
    console.log(userID);

    theUser?.friends.push(userID);

    console.log(theUser?.friends);

    const newField = {
      friends: theUser?.friends,
    };

    console.log("Here");
    const userDoc = doc(db, "users", "nPiHryy4SrBVWS76PBBx");

    await updateDoc(userDoc, newField);

    onClose();
  };

  return (
    <Dialog open={open} maxWidth={"md"}>
      <DialogTitle sx={{ m: 0, p: 2, paddingRight: 4 }}>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{
              position: "absolute",
              right: 2,
              top: 15,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        Add Friends
      </DialogTitle>
      <DialogContent dividers>
        {possibleFriends.map((friend) => {
          return (
            <List
              dense
              sx={{ width: "100%", bgcolor: "background.paper", paddingTop: 2 }}
            >
              <ListItem
                key={friend.uid}
                disablePadding
                onClick={() => {
                  addFriend(friend.uid);
                }}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ width: 56, height: 56 }}
                      alt={`Avatar n°${friend.uid + 1}`}
                      src={friend.profileImg}
                    />
                  </ListItemAvatar>
                  <Typography sx={{ paddingLeft: 2 }}>{friend.name}</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
