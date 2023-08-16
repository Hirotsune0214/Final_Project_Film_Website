import React from "react";
import LeftSidePicMain from "./LeftSidePicMain";
import RightSideDetailMain from "./RightSideDetailMain";
import FavoriteWatch from "./FavoriteWatch";
import CastList from "./CastList";
import { Box } from "@mui/material";

const SinglePageInfo = ({ id }: { id: string }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <LeftSidePicMain id={id} />
      <Box sx={{ flexDirection: "column", width: "60%" }}>
        <RightSideDetailMain id={id} />
        <FavoriteWatch />
        <CastList id={id} />
      </Box>
    </div>
  );
};

export default SinglePageInfo;
