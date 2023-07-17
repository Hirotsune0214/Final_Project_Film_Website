import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: () => React.JSX.Element = () => {
  return (
    <Box
      sx={{
        bgcolor: "#131313",
        color: "#ffffff",
        py: 3, // 上下の余白
        px: 3, // 左右の余白
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4">Title</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          mr: "40px",
        }}
      >
        <Typography>HOME</Typography>
        <Typography>MOVIES</Typography>
        <Typography>TV SERIES</Typography>
        <Typography>SEARCH</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
