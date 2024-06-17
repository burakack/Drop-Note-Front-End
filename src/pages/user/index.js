import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
} from "@mui/material";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState({
    username: "",
    description: "",
    userImage: null,
    notes: [],
    friends: [],
  });

  useEffect(() => {
    axiosInstance.get(`/users/${username}`).then((res) => {
      setUserDetails({
        username: res.data.username,
        description: res.data.description,
        userImage: res.data.userImage,
      });

      axiosInstance.get(`/notes/get-user-notes/${username}`).then((res) => {
        setUserDetails((prev) => ({
          ...prev,
          notes: res.data,
        }));
      });

      axiosInstance.get(`/friendship/user-friendships/${username}`).then((res) => {
        setUserDetails((prev) => ({
          ...prev,
          friends: res.data,
        }));
      });
    });
  }, [username]);

  return (
    <Grid style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Container
        sx={{ minWidth: "100%", py: 5 }}
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ minWidth: "100%", margin: "auto" }}>
          <Grid
            style={{
              backgroundColor: "#000",
              height: "200px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid style={{ marginLeft: "20px" }}>
              {userDetails.userImage ? (
                <CardMedia
                  component="img"
                  image={userDetails.userImage}
                  alt="User Image"
                  sx={{ width: "150px" }}
                />
              ) : (
                <CardMedia
                  component="img"
                  image="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Generic placeholder image"
                  sx={{ width: "150px" }}
                />
              )}
            </Grid>
            <Grid style={{ marginLeft: "20px", marginTop: "130px" }}>
              <Typography variant="h5" color={"white"}>
                {userDetails.username}
              </Typography>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center">
              <Grid style={{ margin: "0 20px" }}>
                <Typography
                  color={"white"}
                  variant="body1"
                  sx={{ textAlign: "center" }}
                >
                  {userDetails.notes?.length}
                </Typography>
                <Typography color={"white"} variant="body2">
                  Notes
                </Typography>
              </Grid>
              <Grid style={{ marginRight: "20px" }}>
                <Typography
                  color={"white"}
                  variant="body1"
                  sx={{ textAlign: "center" }}
                >
                  {userDetails.friends?.length}
                </Typography>
                <Typography color={"white"} variant="body2">
                  Friends
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <CardContent style={{ backgroundColor: "#f8f9fa" }}></CardContent>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid style={{ marginBottom: "20px" }} sx={{ width: "100%" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "normal", marginBottom: "10px" }}
              >
                About
              </Typography>
              <Grid
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic", marginBottom: "10px" }}
                >
                  {userDetails.description || "No description"}
                </Typography>
              </Grid>
            </Grid>
            <Grid sx={{ marginBottom: "20px", paddingLeft: 5, width: "80%" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "normal", marginBottom: "10px" }}
              >
                Badges
              </Typography>
              <Grid
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic", marginBottom: "10px" }}
                >
                  You have no badges yet.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", marginBottom: 2 }}
            >
              Recent Notes
            </Typography>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: "20px" }}
            >
              <Grid
                item
                container
                xs={12}
                sx={{
                  padding: "20px",
                  display: "flex",
                }}
              >
                {userDetails.notes?.length === 0 ? (
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    You have no notes yet.
                  </Typography>
                ) : (
                  userDetails.notes?.map((note) => (
                    <Grid
                      key={note.id}
                      item
                      xs={12}
                      md={2}
                      sx={{
                        backgroundColor: "#f8f9fa",
                        padding: "10px",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", paddingBottom: 1 }}>
                        {note.title}
                      </Typography>
                      <Divider />
                      <Typography variant="body2" sx={{ paddingTop: 1 }}>
                        {note.content}
                      </Typography>
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default UserProfile;
