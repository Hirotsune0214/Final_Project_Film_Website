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
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
      transform: "translate(0, -15px)",
      opacity: "1",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
    },
    "& .text": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.6)",
      transition: ".3s ease-in-out",
      opacity: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(URL);
  return (
    <div>
      <h1>YOU MAY ALSO LIKE</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
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
                  // TODO: heightは、65-70vh
                  height: "70vh",
                  boxShadow: "0 12px 12px gray",
                  transition: "box-shadow .5s",
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
