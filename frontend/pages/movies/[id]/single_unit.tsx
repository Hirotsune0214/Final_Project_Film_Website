import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import LeftSidePicMain from "@/components/detailsOfSingleUnit/LeftSidePicMain";
import LikesWatch from "@/components/detailsOfSingleUnit/FavoriteWatch";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import SingleMovieDetails from "@/components/detailsOfSingleUnit/SingleMovieDetails";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import React from "react";

const single_unit = () => {
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

export default single_unit;
