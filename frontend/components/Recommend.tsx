import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface films {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  name: string;
  first_air_date: string;
}

const Recommend = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movies, setMovies] = useState([]);
  const [ishover, setIshover] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string | undefined): string => {
    if (dateString && dateString.length >= 4) {
      return dateString.substring(0, 4);
    } else {
      return "Unknown"; // もしくは、適切なデフォルト値を返す
    }
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
      transform: "scale(1.1)",
      boxShadow: "9px -8px 25px 4px #777777",
      transition: ".3s ease-in-out",
      position: "absolute",
      zIndex: "2",
      // borderRadius: "10px",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
    },
    "& .text": {
      position: "absolute",
      width: "100%",
      height: "70vh",
      top: 1,
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
      transform: "scale(1.1)",
      zIndex: "2",
    },
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(URL);
  return (
    <div>
      <h1>YOU MAY ALSO LIKE</h1>
      <Swiper
        slidesPerView={4}
        grabCursor={true}
        direction="horizontal"
        spaceBetween={8}
      >
        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
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
                  width: "100%",
                  height: "65vh",
                  margin: "30px 0",
                  zIndex: "1",
                }}
                src={`${URL}${movie.poster_path}`}
                alt={movie.title}
              />

              {ishover && (
                <Box className="text">
                  {movie.title ? (
                    <>
                      <div>{movie.title}</div>
                      <div>{extractYearFromDate(movie.release_date)}</div>

                      <div>{movie.vote_average.toFixed(1)}</div>
                    </>
                  ) : (
                    <>
                      <div>{movie.name}</div>
                      <div>{extractYearFromDate(movie.first_air_date)}</div>
                      <div>{movie.vote_average.toFixed(1)}</div>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
