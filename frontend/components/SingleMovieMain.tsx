import React from "react";
import LeftSidePicMain from "./LeftSidePicMain";
import SingleMovieDetails from "./SingleMovieDetails";
import LikesWatch from "./LikesWatch";
import Videos from "./Videos";
import BackDrops from "./BackDrops";
import Posters from "./Posters";

const SingleMovieMain = () => {
  return (
    <div>
      <LeftSidePicMain />
      <SingleMovieDetails />
      <LikesWatch />
      <Videos />
      <BackDrops />
      <Posters />
    </div>
  );
};

export default SingleMovieMain;
