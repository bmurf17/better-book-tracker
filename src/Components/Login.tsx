import React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";
import {
  onAuthStateChanged,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./MyBooks.css";
import { auth, db, provider } from "./../firebase.config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { SiteUser } from "../types/bookType";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function Login(props: Props) {
  const { user, setUser } = props;

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        const usersCollectionRef = collection(db, "users");

        const q = query(usersCollectionRef, where("uid", "==", user?.uid));

        const querySnapshot = await getDocs(q);

        console.log(querySnapshot.size);

        if (querySnapshot.size === 0) {
          const theUser: SiteUser = {
            uid: user.uid,
            name: user.displayName || "",
            profileImg: user.photoURL || "",
            friends: [],
            dateCreated: new Date(),
          };

          const createUser = async () => {
            await addDoc(usersCollectionRef, theUser);
          };

          createUser();
        }

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("Error Code: " + errorCode);
        console.log("Error Message: " + errorMessage);
        console.log("Email: " + email);
        console.log("Credential: " + credential);
      });
  };

  return (
    <div className="App-header">
      <Box sx={{ p: 1 }}>
        <Typography variant="h5">Sign in with Google</Typography>
      </Box>
      <Box sx={{ p: 1 }}>
        <Button
          startIcon={<GoogleIcon />}
          variant="contained"
          onClick={signInWithGoogle}
        >
          Google
        </Button>
      </Box>
      {user?.displayName ? (
        <Typography variant="body2">Welcome {user?.displayName}</Typography>
      ) : null}
    </div>
  );
}
