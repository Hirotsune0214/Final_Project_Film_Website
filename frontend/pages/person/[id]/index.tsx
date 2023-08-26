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
import PersonProfilePic from "@/components/PersonProfilePic";
import PersonProfileDetail from "@/components/PersonProfileDetail";
import Medias from "@/components/Medias";

interface Movie {}

const single_unit = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const [user, setUser] = useRecoilState(userState);
  const [recommends, setRecommends] = useState([]);
  const [posters, setPosters] = useState([]);
  const [backdrops, setBackDrops] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoDates, setVideoDates] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setVideos(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecommend = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setRecommends(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoviePics = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setPosters(response.data.posters);
      setBackDrops(response.data.backdrops);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchVideos(),
        fetchRecommend(),
        // fetchMovieVideos(),
        fetchMoviePics(),
      ]);

      window.scrollTo({ top: 0 });
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div>
        <Layout>
          <Box sx={{ padding: "16px", display: "flex" }}>
            <PersonProfilePic id={id} />
            <PersonProfileDetail id={id} />
          </Box>
          <Box sx={{ padding: "16px" }}>
            <Medias id={id} />
          </Box>
        </Layout>
      </div>
    </>
  );
};

export default single_unit;
