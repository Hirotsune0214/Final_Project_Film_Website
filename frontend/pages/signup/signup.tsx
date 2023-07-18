import React from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const signup = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          height: "100vh",
          component: "form",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "black" }}>
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            // 下記2つが必要かわからない
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirmPassword"
            type="confirmPassword"
            id="confirmPassword"
          />
          <LoadingButton
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            type="submit"
            loading={false}
            color="primary"
            variant="outlined"
          >
            SIGN UP
          </LoadingButton>
        </Box>
        {/* 位置を調整する */}
        <Button>Already have an account? Sign In</Button>
      </Box>
    </>
  );
};

export default signup;
