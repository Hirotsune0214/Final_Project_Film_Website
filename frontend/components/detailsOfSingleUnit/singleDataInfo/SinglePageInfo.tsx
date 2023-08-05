import React from "react";
import LeftSidePicMain from "./LeftSidePicMain";
import RightSideDetailMain from "./RightSideDetailMain";
import FavoriteWatch from "./FavoriteWatch";

const SinglePageInfo = () => {
  return (
    <div style={{ display: "flex" }}>
      <LeftSidePicMain />
      <div style={{ flexDirection: "column" }}>
        <RightSideDetailMain />
        <FavoriteWatch />
      </div>
    </div>
  );
};

export default SinglePageInfo;
