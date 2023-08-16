import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import React, { useEffect, useState } from "react";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import Recommend from "@/components/Recommend";
import { useRouter } from "next/router";
import SinglePageInfo from "@/components/detailsOfSingleUnit/singleDataInfo/SinglePageInfo";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import { useRecoilState } from "recoil";
import { userState } from "@/src/state/auth";
import axios from "axios";

interface Movie {
  overview: string;
  original_title: string; // 追加: 映画のタイトル
  release_date: string; // 追加: 公開日
  vote_average: number; // 追加: 平均評価
}

const single_unit = () => {
  const router = useRouter();
  const { id }: any = router.query;
  console.log(id);

  const [user, setUser] = useRecoilState(userState);

  // useEffect(() => {
  //   console.log("worked");

  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <Layout>
        <Box sx={{ backgroundColor: "#F5F5F5", padding: "20px" }}>
          <SinglePageInfo id={id} />
          <Videos id={id} />
          <BackDrops id={id} />
          <Posters id={id} />
          {/* <Reviews user={user} /> */}
          <Reviews />
          <Recommend />
        </Box>
      </Layout>
    </div>
  );
};

export default single_unit;
