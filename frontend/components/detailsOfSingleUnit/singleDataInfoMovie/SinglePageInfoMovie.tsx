import LeftSidePicMain from "./LeftSidePicMain";
import RightSideDetailMain from "./RightSideDetailMain";
import FavoriteWatch from "./FavoriteWatch";
import CastList from "./CastList";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

import { Movie } from "@/src/state/category";

const SinglePageInfo = ({ id }: { id: string }) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const [leftPic, setLeftPic] = useState<Movie | null>(null);
  const [rightSideDetail, setRightSideDetail] = useState<Movie | null>(null);
  const [casts, setCasts] = useState([]);

  const fetchMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`
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
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`
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

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };
  return (
    <>
      <Head>
        <title>{leftPic?.original_title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          display: {
            md: "block",
            lg: "flex",
            xl: "flex",
          },
          justifyContent: {
            lg: "center",
            xl: "center",
          },
          alignItems: "center",
        }}
      >
        <LeftSidePicMain leftPic={leftPic} />
        <Box
          sx={{
            flexDirection: "column",
            width: "60%",
            marginRight: {
              lg: "40px",
            },
            marginTop: {
              md: "40px",
              lg: "90px",
              xl: "90px",
            },
          }}
        >
          <RightSideDetailMain
            rightSideDetail={rightSideDetail}
            extractYearFromDate={extractYearFromDate}
          />
          <FavoriteWatch id={id} />
          <CastList casts={casts} />
        </Box>
      </Box>
    </>
  );
};

export default SinglePageInfo;
