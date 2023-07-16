import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: () => React.JSX.Element = () => {
  return (
    <Box
      sx={{
        bgcolor: "#131313",
        color: "#ffffff",
        py: 2, // 上下の余白
        px: 3, // 左右の余白
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // 左右に均等に配置
      }}
    >
      <Typography variant="h6">Title</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          mr: "60px",
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
