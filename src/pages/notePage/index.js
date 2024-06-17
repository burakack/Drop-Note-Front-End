import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
  Divider,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";
import Navbar from "../../components/navbar";
import axiosInstance from "../../axiosInstance";
import { AuthContext } from "../../context/AuthProvider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteContent, setEditNoteContent] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuNoteId, setMenuNoteId] = useState(null);
  const { user } = useContext(AuthContext);
  const title = window.location.href.split("/").pop();

  useEffect(() => {
    axiosInstance
      .post("/notes/get-notes-by-title", {
        title,
      })
      .then((res) => {
        res.data.forEach((note) => {
          note.likes = note.likedBy.length;
          note.dislikes = note.dislikedBy.length;
          note.likedByUser = isLikedByUser(note);
          note.dislikedByUser = isDislikedByUser(note);
        });
        setNotes(res.data);
      });
  }, [user]);

  const isLikedByUser = (note) => {
    return user && note.likedBy.some((u) => u.username === user.username);
  };

  const isDislikedByUser = (note) => {
    return user && note.dislikedBy.some((u) => u.username === user.username);
  };

  const handleLike = (id) => {
    if (notes.find((note) => note.id === id).likedByUser) {
      axiosInstance.post("/notes/remove-like", { id }).then((res) => {
        setNotes((prevNotes) => {
          return prevNotes.map((note) => {
            if (note.id === id) {
              note.likes -= 1;
              note.likedBy = note.likedBy.filter(
                (u) => u.username !== user.username
              );
              note.likedByUser = false;
            }
            return note;
          });
        });
      });
      return;
    }

    axiosInstance.post("/notes/like-note", { id }).then((res) => {
      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          if (note.id === id) {
            note.likes += 1;
            note.likedBy.push(user);
            note.likedByUser = true;
            if (note.dislikedByUser) {
              note.dislikedByUser = false;
              note.dislikes -= 1;
            }
          }
          return note;
        });
      });
    });
  };

  const handleDislike = (id) => {
    if (notes.find((note) => note.id === id).dislikedByUser) {
      axiosInstance.post("/notes/remove-dislike", { id }).then((res) => {
        setNotes((prevNotes) => {
          return prevNotes.map((note) => {
            if (note.id === id) {
              note.dislikes -= 1;
              note.dislikedBy = note.dislikedBy.filter(
                (u) => u.username !== user.username
              );
              note.dislikedByUser = false;
            }
            return note;
          });
        });
      });
      return;
    }
    axiosInstance.post("/notes/dislike-note", { id }).then((res) => {
      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          if (note.id === id) {
            note.dislikes += 1;
            note.dislikedBy.push(user);
            note.dislikedByUser = true;
            if (note.likedByUser) {
              note.likedByUser = false;
              note.likes -= 1;
            }
            return note;
          }
          return note;
        });
      });
    });
  };

  const handleAddNote = () => {
    if (newNote.trim() === "") return;

    const noteData = {
      content: newNote,
      title,
      anonymous: isAnonymous,
    };

    axiosInstance.post("/notes/new-note", noteData).then((res) => {
      res.data.likes = 0;
      res.data.dislikes = 0;
      res.data.user = { username: isAnonymous ? "anonymous" : user?.username };
      setNotes((prevNotes) => [res.data, ...prevNotes]);
      setNewNote("");
      setIsAnonymous(false);
    });
  };

  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setEditNoteContent(note.content);
    handleMenuClose();
  };

  const handleSaveEdit = (id) => {
    axiosInstance
      .put("/notes/update-note", { id, content: editNoteContent })
      .then((res) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, content: editNoteContent } : note
          )
        );
        setEditNoteId(null);
        setEditNoteContent("");
      });
  };

  const handleDeleteNote = (id) => {
    axiosInstance.delete("/notes/delete-note", { data: { id } }).then((res) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      handleMenuClose();
    });
  };

  const handleMenuClick = (event, note) => {
    setAnchorEl(event.currentTarget);
    setMenuNoteId(note.id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuNoteId(null);
  };

  return (
    <Grid style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Container sx={{ marginTop: 4, marginBottom: 4, textAlign: "center" }}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Paper
          sx={{
            alignItems: "center",
            padding: 2,
            marginBottom: 2,
            zIndex: 2,
            position: "relative",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Write a note..."
                value={newNote}
                multiline
                rows={3}
                onChange={(e) => setNewNote(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "right" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                }
                label="Add as Anonymous"
                sx={{ marginBottom: 2 }}
              />
              <Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNote}
                  sx={{ zIndex: 3, position: "relative" }}
                >
                  Add Note
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {notes.length === 0 ? (
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            No notes yet
          </Typography>
        ) : (
          notes.map((note) => (
            <Paper
              key={note.id}
              sx={{
                position: "relative",
                alignItems: "center",
                padding: 2,
                marginBottom: 2,
                zIndex: 1,
              }}
            >
              <IconButton
                onClick={(event) => handleMenuClick(event, note)}
                sx={{
                  position: "absolute",
                  right: 2,
                  top: 2,
                  margin: 1,
                  zIndex: 2,
                }}
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuNoteId === note.id}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(note.content);
                    handleMenuClose();
                  }}
                >
                  <ContentCopyIcon sx={{ marginRight: 1, fontSize: 20 }} />
                  Copy to Clipboard
                </MenuItem>
                {note.user?.username === user?.username && (
                  <>
                    <MenuItem onClick={() => handleEditNote(note)}>
                      <Edit sx={{ marginRight: 1, fontSize: 20 }} />
                      Edit Note
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteNote(note.id)}>
                      <Delete sx={{ marginRight: 1, fontSize: 20 }} />
                      Delete Note
                    </MenuItem>
                  </>
                )}
              </Menu>
              {editNoteId === note.id ? (
                <>
                  <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={editNoteContent}
                    onChange={(e) => setEditNoteContent(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveEdit(note.id)}
                    sx={{ marginRight: 2, zIndex: 3, position: "relative" }}
                  >
                    Save Note
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setEditNoteId(null);
                      setEditNoteContent("");
                    }}
                    sx={{ zIndex: 3, position: "relative" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={note.content}
                        sx={{
                          fontWeight:
                            note.likedByUser || note.dislikedByUser
                              ? "bold"
                              : "normal",
                        }}
                      />
                    </ListItem>
                  </List>
                  <Grid sx={{ display: "flex" }}>
                    <Grid>
                      <IconButton
                        onClick={() => handleLike(note.id)}
                        sx={{ zIndex: 3, position: "relative" }}
                      >
                        <ThumbUp
                          color={note.likedByUser ? "primary" : "inherit"}
                        />
                        <Typography sx={{ marginLeft: 1, marginRight: 1 }}>
                          {note.likes}
                        </Typography>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDislike(note.id)}
                        sx={{ zIndex: 3, position: "relative" }}
                      >
                        <ThumbDown
                          color={note.dislikedByUser ? "error" : "inherit"}
                        />
                        <Typography sx={{ marginLeft: 1, marginRight: 1 }}>
                          {note.dislikes}
                        </Typography>
                      </IconButton>
                    </Grid>
                    <Grid sx={{ marginLeft: "auto", display: "flex" }}>
                      <Typography
                        variant="caption"
                        fontSize={12}
                        sx={{ alignSelf: "flex-end",marginTop: 1, marginRight: 2 }}
                      >
                        {note.createdAt}
                      </Typography>
                      <Typography
                        sx={{ alignSelf: "flex-end", marginTop: 1 }}
                        fontSize={15}
                      >
                        {note.anonymous ? "Anonymous" :note.user.username}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )}
            </Paper>
          ))
        )}
      </Container>
    </Grid>
  );
};

export default NotePage;
