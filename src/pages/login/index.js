import React, { useEffect } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import axiosInstance from "../../axiosInstance";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import Footer from "../../components/simpleFooter";
import Navbar from "../../components/navbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      login();
    }
  }, []);

  const handleLogin = () => {
    axiosInstance
      .post("/users/signin", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data);
        login();
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
    <Navbar />
      <Grid container sx={{ minHeight: "88vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          GÖRSEL AÇIKLAMA IVIR ZIVIR
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Avatar
                sx={{
                  margin: "auto",
                  //bigger
                  width: 50,
                  height: 50,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  marginBottom: 3,
                  marginTop: 3,
                }}
              >
                Giriş Yap
              </Typography>
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    backgroundColor: "#f8d7da",
                    marginTop: 3,
                    marginBottom: 3,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderRadius: 1.5,
                  }}
                >
                  Kullanıcı adı şifre kombinasyonu hatalı!
                </Typography>
              )}

              <TextField
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                size="large"
                sx={{
                  marginBottom: "20px",
                }}
              />
              <TextField
                label="Şifre"
                variant="outlined"
                fullWidth
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                size="large"
                onKeyDown={handleKeyPress}
                sx={{
                  marginBottom: "20px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
                sx={{
                  display: "block",
                  margin: "auto",
                }}
                size="large"
              >
                Giriş Yap
              </Button>
            </Grid>
            <Typography
              variant="body2"
              sx={{
                marginTop: "20px",
              }}
            >
              Hesabınız yok mu?{" "}
              <Button
                color="primary"
                sx={{
                  fontWeight: "bold",
                  padding: "0",
                }}
              >
                Kayıt Ol
              </Button>
            </Typography>
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LoginPage;
