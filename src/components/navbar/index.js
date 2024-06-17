import React, { useState, useContext, useEffect } from "react";
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
import { Grid } from "@mui/material";
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
  const [notifications, setNotifications] = useState([]);
  const { isAuthenticated, logout, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    axiosInstance
      .get("/notifications/get-my-notifications")
      .then((res) => {
        setNotifications(res.data);
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
        {localStorage.getItem("access_token") && (
          <>
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
              Support
            </Button>
          </>
        )}

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
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <MenuItem
                    key={notification.id}
                    onClick={handleNotificationMenuClose}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: 2, 
                      marginLeft:2,
                      marginRight:2
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize={14}
                      sx={{
                        fontStyle: "italic",
                        marginBottom: 1,
                        fontWeight: "bold",
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontStyle: "italic", marginBottom: 1 }}
                      fontSize={12}
                    >
                      {notification.content}
                    </Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={handleNotificationMenuClose}>
                  No notifications
                </MenuItem>
              )}
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
