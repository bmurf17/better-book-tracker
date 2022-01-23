import { useState, useEffect } from "react";
import { SiteUser } from "../types/bookType";
import { db } from "../firebase.config";
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
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  theUser: SiteUser | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddFriendDialog(props: Props) {
  const { theUser, setOpen, open, setLoading } = props;

  const [possibleFriends, setPossibleFriends] = useState<SiteUser[]>([]);

  useEffect(() => {
    const getPossibleFriends = async () => {
      const usersCollectionRef = collection(db, "users");

      const q = query(usersCollectionRef, where("uid", "!=", theUser?.uid));

      const querySnapshot = await getDocs(q);
      const friendList = querySnapshot.docs.map((doc) => {
        //might be able to remove setting it as an empty object. Just fear of it not being undefined
        let theFriend: SiteUser = {
          id: "",
          friends: [],
          name: "",
          profileImg: "",
          uid: "",
        };
        if (!theUser?.friends.includes(doc.data().uid)) {
          theFriend = {
            id: doc.data().id,
            friends: doc.data().friends,
            name: doc.data().name,
            profileImg: doc.data().profileImg,
            uid: doc.data().uid,
          };
        }
        return theFriend;
      });
      setPossibleFriends(friendList);
    };
    if (theUser) {
      getPossibleFriends();
    }
  }, [theUser, possibleFriends]);

  const onClose = () => {
    setOpen(false);
  };

  const addFriend = async (userID: string) => {
    //need to keep the loading because this indicated to the the list to reload
    setLoading(true);
    theUser?.friends.push(userID);

    const newField = {
      friends: theUser?.friends,
    };

    const docID: string = theUser?.id as string;

    const userDoc = doc(db, "users", docID);

    await updateDoc(userDoc, newField);

    setLoading(false);
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
          //this is the empty friend set above can remove if figure out that
          if (friend.id !== "") {
            return (
              <List
                dense
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  paddingTop: 2,
                }}
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
                    <Typography sx={{ paddingLeft: 2 }}>
                      {friend.name}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            );
          } else {
            return null;
          }
        })}
      </DialogContent>
    </Dialog>
  );
}
