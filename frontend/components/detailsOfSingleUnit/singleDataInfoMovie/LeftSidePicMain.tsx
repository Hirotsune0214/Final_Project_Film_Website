import React from "react";

import { Movie } from "@/src/state/category";
import { Box } from "@mui/material";

const LeftSidePicMain = ({ leftPic }: { leftPic: Movie | null }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

  if (!leftPic) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${URL}${leftPic.poster_path})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: {
            xs: "55vh",
            md: "80vh",
            lg: "90vh",
            xl: "90vh",
          },
          width: {
            md: "750px",
            lg: "470px",
            xl: "650px",
          },
          fontWeight: {
            md: "bold",
          },
          marginTop: {
            md: "70px",
            lg: "10px",
          },
        }}
      ></Box>
    </Box>
  );
};

export default LeftSidePicMain;
