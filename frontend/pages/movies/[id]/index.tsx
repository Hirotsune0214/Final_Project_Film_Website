import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import React from "react";
import Header from "@/components/Header";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import Recommend from "@/components/Recommend";
import { useRouter } from "next/router";
import SinglePageInfo from "@/components/detailsOfSingleUnit/singleDataInfo/SinglePageInfo";

const single_unit = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return (
    <div>
      <Header />
      <SinglePageInfo />
      <Videos />
      <BackDrops />
      <Posters />
      <Reviews />
      <Recommend />
    </div>
  );
};

export default single_unit;
