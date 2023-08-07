import React from "react";
import LeftSidePicMain from "./LeftSidePicMain";
import RightSideDetailMain from "./RightSideDetailMain";
import FavoriteWatch from "./FavoriteWatch";
import CastList from "./CastList";

const SinglePageInfo = () => {
  return (
    <div style={{ display: "flex" }}>
      <LeftSidePicMain />
      <div style={{ flexDirection: "column" }}>
        <RightSideDetailMain />
        <FavoriteWatch />
        <CastList />
      </div>
    </div>
  );
};

export default SinglePageInfo;
