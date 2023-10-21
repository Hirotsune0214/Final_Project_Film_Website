import React from "react";

import { Drama } from "@/src/state/category";
import { Box } from "@mui/material";

const LeftSidePicMain = ({ leftPic }: { leftPic: Drama | null }) => {
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
          width: "500px",
          marginRight: {
            lg: "10px",
          },
        }}
      ></Box>
    </Box>
  );
};

export default LeftSidePicMain;
