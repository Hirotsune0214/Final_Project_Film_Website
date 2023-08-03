import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import LeftSidePicMain from "@/components/detailsOfSingleUnit/LeftSidePicMain";
import React from "react";
import Header from "@/components/Header";
import SingleUnitMainImage from "@/components/detailsOfSingleUnit/SingleUnitMainImage";
import RightSideDetailMain from "@/components/detailsOfSingleUnit/RightSideDetailMain";
import FavoriteWatch from "@/components/detailsOfSingleUnit/FavoriteWatch";
import CastList from "@/components/detailsOfSingleUnit/CastList";

const single_unit = () => {
  return (
    <div>
      <Header />
      <SingleUnitMainImage />
      <LeftSidePicMain />
      <RightSideDetailMain />
      <FavoriteWatch />
      <CastList />
      <Videos />
      <BackDrops />
      <Posters />
      <Reviews />
    </div>
  );
};

export default single_unit;
