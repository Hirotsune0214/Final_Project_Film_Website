import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar position="static">
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Typography variant="h6" sx={{ ml: "30px" }}>
            Title
          </Typography>
          <Typography variant="h6">HOME</Typography>
          <Typography variant="h6">MOVIES</Typography>
          <Typography variant="h6">TV SERIES</Typography>
          <Typography variant="h6">SEARCH</Typography>
          <Typography variant="h6">SUN MARK</Typography>
        </Box>
        <Button
          color="inherit"
          sx={{
            display: "flex",
            alignItems: "center",
            variant: "contained",
            color: "red",
            position: "absolute",
            right: 0,
          }}
        >
          SIGN IN
        </Button>
      </AppBar>
    </Box>
  );
}
