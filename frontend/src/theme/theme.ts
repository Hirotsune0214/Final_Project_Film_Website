// const theme = createTheme({
//   palette: {
//     background: {
//       default: "#000101",
//     },
//   },
// });

import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 520, // tablet
      md: 520,
      lg: 960, // laptop
      xl: 1200, // monitor
    },
  },
});

export default theme;
