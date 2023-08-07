import { Box, Button } from "@mui/material";
import React from "react";

const LoadMore_movies = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        mt: "50px",
      }}
    >
      <Button sx={{ color: "#FF0000", fontSize: "15px", fontWeight: "bold" }}>
        LOAD MORE
      </Button>
    </Box>
  );
};

export default LoadMore_movies;
