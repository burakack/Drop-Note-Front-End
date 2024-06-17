import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Link,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import Navbar from "../../components/navbar";
import axiosInstance from "../../axiosInstance";

const SupportPage = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const response = await axiosInstance.get("/ticket/get-my-tickets");
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ticketDto = {
      title: title,
      content: message,
      email: email,
    };

    try {
      //if have blank fields return
      if (!title || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      axiosInstance.post("/ticket/new-ticket", ticketDto).then((response) => {
        if (response.status === 200) {
          setTitle("");
          setEmail("");
          setMessage("");
          fetchTickets();
        } else {
          alert("Error: " + response.statusText);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          marginTop: 4,
          textAlign: "center",
        }}
      >
        <Grid container>
          <Grid xs={12} md={12} sx={{ marginBottom: 2 }}>


        
        <Typography variant="h4" sx={{ marginBottom: 2, marginTop: 5 }}>
          Support Center
        </Typography>
        <Typography variant="body1">
          We are here for your questions and feedback. You can fill out the form
          below to contact us.
        </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message"
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        
        
        </Grid>
        <Grid xs={12} md={12}>
        <Typography variant="h5" sx={{ marginBottom: 2, marginTop: 2 }}>
          My Tickets
        </Typography>

        <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : tickets.length > 0 ? (
          <List>
            {tickets.map((ticket) => (
              <ListItem key={ticket.id}>
                <ListItemText
                  primary={ticket.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {ticket.content}
                      </Typography>
                      {" — "}
                      {new Date(ticket.createdAt).toLocaleString()}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2">
            No tickets found. You can create a new ticket using the form above.
          </Typography>
        )}
        </Grid>
        </Grid> 
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          This project is being developed voluntarily,{" "}
          <Link href="/destek-ol">click here</Link> to support
        </Typography>
      </Container>
    </>
  );
};

export default SupportPage;
