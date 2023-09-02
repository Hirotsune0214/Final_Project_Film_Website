import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import React, { useEffect, useState } from "react";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import Recommend from "@/components/Recommend";
import { useRouter } from "next/router";

import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import axios from "axios";
import SinglePageInfo from "@/components/detailsOfSingleUnit/singleDataInfoMovie/SinglePageInfoMovie";

import { Toaster, toast } from "react-hot-toast";

export const RecommendCss = {
  maxWidth: "500px",
  margin: "0 auto",
  position: "relative",
  cursor: "pointer",
  background: "cover",
  "&:hover .text": {
    opacity: 1,
  },
  "&:hover .img": {
    transform: "scale(1.05) translateY(-10px)",
    transition: ".3s ease-in-out",
    position: "relative",
    zIndex: "2",
    // TODO: 下記2つの色の微調整を行う
    boxShadow: "8px -9px 20px -2px rgba(119,119,119,0.7)",
    borderColor: "rgba(11, 64, 188, 0.775)",
  },
  "& .img": {
    width: "100%",
    height: "100%",
    transition: "transform 0.2s",
    border: "4px solid transparent",
  },
  "& .text": {
    position: "absolute",
    width: "93%",
    height: "57.5vh",
    top: 0,
    left: 0,
    textAlign: "center",
    color: "#fff",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
    transition: ".3s ease-in-out",
    opacity: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(1.05)",
    zIndex: "2",
    marginTop: "65.1px",
    marginLeft: "11.5px",
    borderRadius: "10px",
  },
};

const single_unit = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  // const [user, setUser] = useRecoilState(userState);
  const [recommends, setRecommends] = useState([]);
  const [posters, setPosters] = useState([]);
  const [backdrops, setBackDrops] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`
      );
      setVideos(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecommend = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apikey}`
      );
      setRecommends(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoviePics = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apikey}`
      );
      setPosters(response.data.posters);
      setBackDrops(response.data.backdrops);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      toast.loading("Loading");
      await Promise.all([fetchVideos(), fetchRecommend(), fetchMoviePics()]);
      toast.dismiss();
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
        <Toaster />
        <Layout>
          <Box sx={{ backgroundColor: "#F5F5F5", padding: "20px" }}>
            <SinglePageInfo id={id} />
            <Videos videos={videos} />
            <BackDrops backdrops={backdrops} />
            <Posters posters={posters} />
            <Reviews id={id} category="movie" />
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
