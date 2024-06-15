import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

const Profile = (props) => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [friends, setFriends] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notSavedDescription, setNotSavedDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    axiosInstance.get("/users/me").then((res) => {
      setUsername(res.data.username);
      setDescription(res.data.description);
    });
    axiosInstance.get("/friendship/my-friendships").then((res) => {
      setFriends(res.data);
    });
    axiosInstance.get("/notes/get-my-notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axiosInstance.post("/users/upload-user-image", formData).then((res) => {
      setUserImage(res.data);
      setOpen(false);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setNotSavedDescription(description);
  };

  const handleSave = () => {
    setIsEditing(false);
    axiosInstance
      .post("/users/edit-user-information", {
        description: notSavedDescription,
      })
      .then((res) => {
        setDescription(notSavedDescription);
      });
  };

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
              {userImage ? (
                <CardMedia
                  component="img"
                  image={userImage}
                  alt="Generic placeholder image"
                  sx={{ width: "150px", "&:hover": { cursor: "pointer" } }}
                  onClick={() => setOpen(true)}
                />
              ) : (
                <CardMedia
                  component="img"
                  image="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Generic placeholder image"
                  sx={{ width: "150px", "&:hover": { cursor: "pointer" } }}
                  onClick={() => setOpen(true)}
                />
              )}
            </Grid>
            <Grid style={{ marginLeft: "20px", marginTop: "130px" }}>
              <Typography variant="h5" color={"white"}>
                {username}
              </Typography>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center">
              <Grid style={{ margin: "0 20px" }}>
                <Typography
                  color={"white"}
                  variant="body1"
                  sx={{ textAlign: "center" }}
                >
                  {notes.length}
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
                  {friends.length}
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
              {isEditing ? (
                <Grid
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    height: "100%",
                  }}
                >
                  <TextField
                    placeholder="Something about you"
                    multiline
                    rows={2}
                    maxRows={4}
                    //default value is description
                    value={notSavedDescription}
                    onChange={(e) => setNotSavedDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSave();
                      }
                    }}
                    sx={{ width: "100%" }}
                  />
                  <Button
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    color="primary"
                    startIcon={<CancelIcon />}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              ) : (
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
                    {description || "No description"}
                  </Typography>
                  <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </Grid>
              )}
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
                {notes.length === 0 ? (
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    You have no notes yet.
                  </Typography>
                ) : (
                  notes.map((note) => (
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Upload Image"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please choose an image to upload.
          </DialogContentText>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleImageUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Profile;
