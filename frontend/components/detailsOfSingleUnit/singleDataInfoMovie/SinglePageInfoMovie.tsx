import LeftSidePicMain from "./LeftSidePicMain";
import RightSideDetailMain from "./RightSideDetailMain";
import FavoriteWatch from "./FavoriteWatch";
import CastList from "./CastList";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

interface MoviePic {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  name: string;
}

const SinglePageInfo = ({ id }: { id: string }) => {
  const [leftPic, setLeftPic] = useState<MoviePic | null>(null);
  const [rightSideDetail, setRightSideDetail] = useState<MoviePic | null>(null);
  const [casts, setCasts] = useState([]);

  const fetchMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setLeftPic(response.data);
      setRightSideDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCasts = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setCasts(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieInfo();
    fetchCasts();
  }, [id]);
  return (
    <>
      <Head>
        <title>{leftPic?.original_title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        {/* このページでidを取得しているからidを下の階層に渡さなくても良い？ */}
        <LeftSidePicMain leftPic={leftPic} />
        <Box sx={{ flexDirection: "column", width: "60%" }}>
          <RightSideDetailMain rightSideDetail={rightSideDetail} />
          <FavoriteWatch id={id} />
          <CastList casts={casts} />
        </Box>
      </div>
    </>
  );
};

export default SinglePageInfo;
