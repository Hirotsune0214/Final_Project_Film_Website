import React from "react";
import LeftSidePicMain from "./LeftSidePicMain";
import RightSideDetailMain from "./RightSideDetailMain";
import FavoriteWatch from "./FavoriteWatch";
import CastList from "./CastList";
import { Box } from "@mui/material";

const SinglePageInfo = () => {
  return (
    <div style={{ display: "flex" }}>
      <LeftSidePicMain />
      <Box sx={{ flexDirection: "column", width: "60%" }}>
        <RightSideDetailMain />
        <FavoriteWatch />
        <CastList />
      </Box>
    </div>
  );
};

export default SinglePageInfo;
