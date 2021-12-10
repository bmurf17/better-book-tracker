import React from "react";
import { useState } from "react";
import {
  TextField,
  Typography,
  Container,
  Button,
  Box,
} from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./Home.css";
import { auth, provider } from "./../firebase.config";

export function Login() {
  //state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  //page functions
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
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
      <Typography variant="h3">Register</Typography>
      <Container maxWidth="sm">
        <Box sx={{ p: 1 }} display="flex">
          <TextField
            label="Email"
            fullWidth
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ p: 1 }} display="flex">
          <TextField
            label="Password"
            fullWidth
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
        </Box>
      </Container>
      <Box sx={{ p: 1 }}>
        <Button onClick={register} variant="contained">
          Register
        </Button>
      </Box>
      <Typography variant="h3">Login</Typography>
      <Container maxWidth="sm">
        <Box sx={{ p: 1 }} display="flex">
          <TextField
            label="Email"
            fullWidth
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ p: 1 }} display="flex">
          <TextField
            label="Password"
            fullWidth
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
        </Box>
      </Container>
      <Box sx={{ p: 1 }}>
        <div className="App-padding">
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        </div>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography variant="h5">Or Use Google</Typography>
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
      <p>{user?.uid}</p>
    </div>
  );
}
