import { Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material";
import { User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import CloseIcon from "@mui/icons-material/Close";
import { SiteUser } from "../types/bookType";

interface Props {
  user: User | null;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export function AddFriendDialog(props: Props) {
  const { user, setOpen, open } = props;
  const [possibleFriends, setPossibleFriends] = useState<SiteUser[]>([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const usersCollectionRef = collection(db, "users");

      const q = query(usersCollectionRef, where("uid", "!=", user?.uid));

      const querySnapshot = await getDocs(q);
      const friendList = querySnapshot.docs.map((doc) => {
        const theFriend: SiteUser = {
          friends: doc.data().friends,
          name: doc.data().name,
          profileImg: doc.data().profileImg,
          uid: doc.data().uid,
        };
        return theFriend;
      });
      setPossibleFriends(friendList);
    };
    getCurrentUser();
  }, [user]);

  const onClose = () => {
    setOpen(false);
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
          return <p> {friend.name}</p>;
        })}
      </DialogContent>
    </Dialog>
  );
}
