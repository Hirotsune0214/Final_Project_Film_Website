import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import React from "react";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import Recommend from "@/components/Recommend";
import { useRouter } from "next/router";
import SinglePageInfo from "@/components/detailsOfSingleUnit/singleDataInfo/SinglePageInfo";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import { useRecoilState } from "recoil";
import { userState } from "@/src/state/auth";

const single_unit = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [user, setUser] = useRecoilState(userState);

  return (
    <div>
      <Layout>
        <Box sx={{ backgroundColor: "#F5F5F5", padding: "20px" }}>
          <SinglePageInfo />
          <Videos />
          <BackDrops />
          <Posters />
          <Reviews user={user} />
          <Recommend />
        </Box>
      </Layout>
    </div>
  );
};

export default single_unit;
