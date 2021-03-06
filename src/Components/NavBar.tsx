import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";
import { signOut, User } from "firebase/auth";
import { auth } from "./../firebase.config";

interface Props {
  user: User | null;
}

const pages = ["Home", "Books", "Friends"];
const logoutLinks = ["Logout"];
const logInLinks = ["Login"];

export function NavBar(props: Props) {
  const { user } = props;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <BookIcon />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {page === "Home" ? (
                    <Link
                      to={"/"}
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        padding: 12,
                      }}
                    >
                      <Typography variant="h5" color="inherit">
                        Home
                      </Typography>
                    </Link>
                  ) : (
                    <Link
                      to={"/" + page}
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        padding: 12,
                      }}
                    >
                      <Typography variant="h5" color="inherit">
                        {page}
                      </Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <BookIcon />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              if (page === "Home") {
                return (
                  <Link
                    key={page}
                    to={"/"}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: 12,
                    }}
                  >
                    <Typography variant="h5" color="inherit">
                      Home
                    </Typography>
                  </Link>
                );
              } else {
                return (
                  <Link
                    to={"/" + page}
                    key={page}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: 12,
                    }}
                  >
                    <Typography variant="h5" color="inherit">
                      {page}
                    </Typography>
                  </Link>
                );
              }
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user?.photoURL ? (
                  <Avatar alt="Remy Sharp" src={user?.photoURL} />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                    }
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{
                display: { xs: "block", md: "block" },
              }}
            >
              {user?.uid
                ? logoutLinks.map((setting) => {
                    if (setting === "Logout") {
                      return (
                        <MenuItem key={setting} onClick={logout}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem key={setting} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    }
                  })
                : logInLinks.map((setting) => {
                    if (setting === "Login") {
                      return (
                        <MenuItem key={setting} onClick={logout}>
                          <Link
                            to={"/login"}
                            style={{
                              textDecoration: "none",
                              color: "blue",
                              padding: 12,
                            }}
                          >
                            <Typography variant="h5" color="inherit">
                              Login
                            </Typography>
                          </Link>
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem key={setting} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    }
                  })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
