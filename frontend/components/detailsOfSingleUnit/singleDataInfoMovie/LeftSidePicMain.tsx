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
          height: "90vh",
          width: {
            lg: "470px",
            xl: "650px",
          },
          fontWeight: {
            md: "bold",
          },
        }}
      ></Box>
    </Box>
  );
};

export default LeftSidePicMain;
