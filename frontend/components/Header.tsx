import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: "1" }}>
            Title
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "red" }}
          >
            HOME
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MOVIES
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TV SERIES
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SEARCH
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SUN MARK
          </Typography>
          <Button color="inherit" sx={{ color: "red" }}>
            SIGN IN
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
