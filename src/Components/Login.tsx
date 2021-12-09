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
} from "firebase/auth";
import "./Home.css";
import { auth } from "./../firebase.config";

export function Login() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
        <Button startIcon={<GoogleIcon />} variant="contained">
          Google
        </Button>
      </Box>
    </div>
  );
}
