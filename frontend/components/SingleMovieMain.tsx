import React from "react";
import LeftSidePicMain from "./LeftSidePicMain";
import SingleMovieDetails from "./SingleMovieDetails";
import LikesWatch from "./LikesWatch";
import Videos from "./Videos";
import BackDrops from "./BackDrops";
import Posters from "./Posters";
import Reviews from "./Reviews";

const SingleMovieMain = () => {
  return (
    <div>
      <LeftSidePicMain />
      <SingleMovieDetails />
      <LikesWatch />
      <Videos />
      <BackDrops />
      <Posters />
      <Reviews />
    </div>
  );
};

export default SingleMovieMain;
