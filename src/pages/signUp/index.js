import React from "react";
import SockJS from "sockjs-client";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import axiosInstance from "../../axiosInstance";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { useState } from "react";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const theme = useTheme();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isAcceptedMailUpdates, setIsAcceptedMailUpdates] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password !== passwordAgain) {
      setError(true);
      return;
    }
    axiosInstance
      .post("/users/signup", {
        username: username,
        email: email,
        password: password,
        passwordAgain: passwordAgain,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data);
        login();
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Grid
          sx={{
            marginTop: theme.spacing(20),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            style={{ width: "100%", marginTop: theme.spacing(3) }}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="userName"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordAgain"
                  label="Password Again"
                  type="password"
                  id="passwordAgain"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  onChange={(e) => setIsAcceptedMailUpdates(e.target.checked)}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  backgroundColor: "#f8d7da",
                  marginTop: 3,
                  paddingTop: 2,
                  paddingLeft: 2,
                  paddingBottom: 2,
                  borderRadius: 1.5,
                  textAlign: "center",
                }}
              >
                Bir hata oluştu
              </Typography>
            )}
            <Button
              onClick={handleSignUp}
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                margin: theme.spacing(3, 0, 2),
              }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2" align="center">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default SignUp;
