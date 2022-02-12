import React, { useEffect } from "react";
import { auth, provider } from "./../firebase.config";
import "./MyBooks.css";
import { Typography, Button, Box } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";
import {
  onAuthStateChanged,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { addUserToDB } from "../functions/LoadUser";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function Login(props: Props) {
  const { user, setUser } = props;

  useEffect(() => {
    addUserToDB(user);
  }, [user]);

  //Might not need? This is probably handled in the same method in App.tsx
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  //Very much based of firebase documentation
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
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
