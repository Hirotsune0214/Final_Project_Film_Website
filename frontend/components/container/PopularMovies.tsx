import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { useRouter } from "next/router";

interface films {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const PopularMovies = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movies, setMovies] = useState([]);
  const [ishover, setIshover] = useState(false);

  const router = useRouter();
  const { id }: any = router.query;

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  const boxSX = {
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
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        POPULAR MOVIES
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "45%",
            borderBottom: "7px solid red",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        ></span>
      </h1>

      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movies/${movie.id}`} passHref>
              <Box
                onMouseEnter={() => {
                  setIshover(true);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                }}
                sx={boxSX}
              >
                <img
                  className="img"
                  style={{
                    // width: "100%",
                    // スペースができるので微調整していく
                    width: "92%",
                    height: "60vh",
                    zIndex: "1",
                    margin: "50px 0 25px 10.5px",
                    borderRadius: "10px",
                  }}
                  src={`${URL}${movie.poster_path}`}
                  alt={movie.title}
                />

                <Box className="text">
                  <div>{movie.vote_average}</div>
                  <div>{extractYearFromDate(movie.release_date)}</div>
                  <div>{movie.title}</div>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovies;
