import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import React, { useEffect, useState } from "react";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import Recommend from "@/components/Recommend";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import { useRecoilState } from "recoil";
import { userState } from "@/src/state/auth";
import axios from "axios";
import SinglePageInfo from "@/components/detailsOfSingleUnit/singleDataInfoDrama/SinglePageInfoDrama";

const single_unit = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const [user, setUser] = useRecoilState(userState);
  const [recommends, setRecommends] = useState([]);
  const [posters, setPosters] = useState([]);
  const [backdrops, setBackDrops] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apikey}`
      );
      setVideos(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecommend = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${apikey}`
      );
      setRecommends(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoviePics = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${apikey}`
      );
      setPosters(response.data.posters);
      setBackDrops(response.data.backdrops);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchVideos(), fetchRecommend(), fetchMoviePics()]);

      window.scrollTo({ top: 0 });
    };

    fetchData();
  }, [id]);

  const extractYearFromDate = (dateString: string | undefined): string => {
    if (dateString && dateString.length >= 4) {
      return dateString.substring(0, 4);
    } else {
      return "Unknown";
    }
  };

  return (
    <>
      <div>
        <Layout>
          <Box sx={{ backgroundColor: "#F5F5F5", padding: "20px" }}>
            <SinglePageInfo id={id} />
            <Videos videos={videos} />
            <BackDrops backdrops={backdrops} />
            <Posters posters={posters} />
            <Reviews id={id} category="drama" />
            <Recommend
              recommends={recommends}
              extractYearFromDate={extractYearFromDate}
            />
          </Box>
        </Layout>
      </div>
    </>
  );
};

export default single_unit;
