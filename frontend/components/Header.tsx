import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            bgcolor: "#000101",
            height: "50px",
          }}
        >
          <Typography variant="h6" sx={{ ml: "30px" }}>
            Title
          </Typography>
          <Typography
            variant="h6"
            sx={{
              border: "solid",
              backgroundColor: "red",
              borderColor: "red",
              borderRadius: "3px",
            }}
          >
            HOME
          </Typography>
          <Typography variant="h6">MOVIES</Typography>
          <Typography variant="h6">TV SERIES</Typography>
          <Typography variant="h6">SEARCH</Typography>
          <DarkModeOutlinedIcon />
          <Button
            color="inherit"
            sx={{
              border: "solid",
              backgroundColor: "red",
              borderColor: "red",
              position: "absolute",
              right: "20px",
              // hoverの実装を行う
              // "&:hover": {},
            }}
          >
            SIGN IN
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
}

// display: "flex",
//             justifyContent: "center",
//             variant: "contained",
//             color: "red",
//             position: "absolute",
//             right: 0,
