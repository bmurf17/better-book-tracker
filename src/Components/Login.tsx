import React from "react";
import {
  TextField,
  Typography,
  Container,
  Button,
  Box,
} from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";

export function Login() {
  return (
    <div className="App-header">
      <Typography variant="h3">Login</Typography>
      <Container maxWidth="sm">
        <Box sx={{ p: 1 }} display="flex">
          <TextField label="Email" fullWidth />
        </Box>
        <Box sx={{ p: 1 }} display="flex">
          <TextField label="Password" fullWidth />
        </Box>
      </Container>
      <Box sx={{ p: 1 }}>
        <Button variant="contained">Login</Button>
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
