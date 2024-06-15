import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const [chatMenuAnchor, setChatMenuAnchor] = useState(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const { isAuthenticated , logout} = useContext(AuthContext);


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

  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          "@media (min-width: 600px)": {
            paddingLeft: 5,
            paddingRight: 1,
            minHeight: "7vh",
          },
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DropNote
        </Typography>

        {(isAuthenticated || localStorage.getItem("access_token")) && (
          <>
            <IconButton color="inherit" onClick={handleChatMenuOpen}>
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
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <Avatar src="https://avatars.githubusercontent.com/u/77445964?v=4" />
        </IconButton>
        <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
          disableScrollLock={true}
          sx={{
            "& .MuiMenu-paper": {
              marginTop: 1.5,
              width: 400,
            },
          }}
        >
          {/* Profile dropdown menu items */}
          <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
        </Menu>
          </>
        )}


      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
