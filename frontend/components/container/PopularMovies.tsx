import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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
  // hoverされたら発火するようにする
  const [ishover, setIshover] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=bb46848237eacc0a36827f6639b47ee3&language=en-US&region=US&page=1"
      );
      setMovies(response.data.results);
      // console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  const boxSX = {
    "&:hover": {
      transition: "all 0.3s ease 0s",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0px",
      left: "0px",
      backgroundImage:
        "linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))",
    },
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>POPULAR MOVIES</h1>
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
                style={{
                  width: "100%",
                  boxShadow: "0 12px 12px gray",
                  transition: "box-shadow .5s",
                }}
                src={`${URL}${movie.poster_path}`}
                alt={movie.title}
              />
              <Box>
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

export default PopularMovies;
