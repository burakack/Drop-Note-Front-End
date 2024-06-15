import React from "react";
import {
  Container,
  Typography,
  Button,
  Link,
  TextField,
  Divider,
} from "@mui/material";
import Navbar from "../../components/navbar";

const SupportPage = () => {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          marginTop: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2, marginTop: 5 }}>
          Support Center
        </Typography>
        <Typography variant="body1">
          We are here for your questions and feedback. You can fill out the form
          below to contact us.
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <TextField
          id="email"
          label="E-mail"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <TextField
          id="message"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          type="submit"
        >
          Gönder
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          This project is being developed voluntarily,{" "}
          <Link href="/destek-ol">click here</Link> to support
        </Typography>
      </Container>
    </>
  );
};

export default SupportPage;
