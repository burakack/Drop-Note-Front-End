import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Button,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const Navbar = () => {
  const [chatMenuAnchor, setChatMenuAnchor] = useState(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const { isAuthenticated, logout,setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useState(() => {
    axiosInstance
      .get("/users/me")
      .then((res) => {
        setUsername(res.data.username);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const handleChatMenuOpen = (event) => {
    setChatMenuAnchor(event.currentTarget);
  };

  const handleChatMenuClose = () => {
    setChatMenuAnchor(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          "@media (min-width: 600px)": {
            paddingLeft: 5,
            paddingRight: 1,
            minHeight: "4vh",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{ cursor: "pointer" }} // Align to the right
          onClick={() => navigate("/")}
        >
          DropNote
        </Typography>

        <Button
          color="inherit"
          onClick={() => navigate("/search")}
          sx={{ marginLeft: 3 }}
        >
          Search
        </Button>

        <Button
          color="inherit"
          onClick={() => navigate("/support")}
          sx={{ marginLeft: 3 }}
        >
          Support Us
        </Button>



        {(isAuthenticated || localStorage.getItem("access_token")) && (
          <>
            <IconButton
              color="inherit"
              onClick={handleChatMenuOpen}
              sx={{ marginLeft: "auto" }}
            >
              <ChatIcon />
            </IconButton>
            <Menu
              anchorEl={chatMenuAnchor}
              open={Boolean(chatMenuAnchor)}
              disableScrollLock={true}
              onClose={handleChatMenuClose}
              sx={{
                "& .MuiMenu-paper": {
                  marginTop: 2.5,
                  width: 400,
                },
              }}
            >
              {/* Chat dropdown menu items */}
              <MenuItem onClick={handleChatMenuClose}>Chat 1</MenuItem>
              <MenuItem onClick={handleChatMenuClose}>Chat 2</MenuItem>
            </Menu>

            <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
              <NotificationsIcon />
            </IconButton>
            <Menu
              anchorEl={notificationMenuAnchor}
              open={Boolean(notificationMenuAnchor)}
              disableScrollLock={true}
              onClose={handleNotificationMenuClose}
              sx={{
                "& .MuiMenu-paper": {
                  marginTop: 2.5,
                  width: 400,
                },
              }}
            >
              <MenuItem onClick={handleNotificationMenuClose}>
                Notification 1
              </MenuItem>
              <MenuItem onClick={handleNotificationMenuClose}>
                Notification 2
              </MenuItem>
            </Menu>
            <Button
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{
                textTransform: "none",
                borderRadius: 0,
                "&:hover": {
                  borderRadius: 0,
                },
              }}
            >
              <>
                <Avatar src="https://avatars.githubusercontent.com/u/77445964?v=4" />
                <Typography
                  variant="body2"
                  sx={{ marginLeft: 1, marginRight: 1, paddingTop: 1.5 }}
                >
                  {username}
                </Typography>
              </>
            </Button>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              disableScrollLock={true}
              sx={{
                "& .MuiMenu-paper": {
                  marginTop: 1.5,
                  width: 200,
                },
              }}
            >
              <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
              <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
