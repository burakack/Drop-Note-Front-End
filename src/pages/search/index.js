import React from "react";
import { Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchBar from "../../components/searchBar";
import Navbar from "../../components/navbar";

const SearchPage = () => {
  const theme = useTheme();
  return (
    <>
      <Navbar />
      <Grid
        sx={{
          //background: theme.palette.araton.main,
          minHeight: "96vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
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
          <SearchBar />
        </Container>
      </Grid>
    </>
  );
};

export default SearchPage;
