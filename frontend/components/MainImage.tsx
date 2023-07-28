import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box } from "@mui/material";


// interfaceを使い回して良いのか
interface films {

interface Series {

  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: "string";

}

const PopularMovies = () => {
  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL


  const [dramas, setDramas] = useState<Series[]>([]);

  const fetchDramas = async () => {
    try {
      const response = await axios.get(
        // "https://api.themoviedb.org/3/movie/upcoming?api_key=bb46848237eacc0a36827f6639b47ee3&language=en-US&region=US&page=1"
        "https://api.themoviedb.org/3/movie/upcoming?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setDramas(response.data.results);

      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };


  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(movies);


  return (
    <div style={{}}>
      {/* Swiperコンポーネント */}
      <Swiper slidesPerView="auto" grabCursor={true} direction="horizontal">

        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                backgroundImage: `URL(${URL}${movie.backdrop_path})`,

                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
              }}
            >
              {/* ここに再度divを追加して記述する理由 */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  backgroundImage:
                    "linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0))",
                }}
              ></div>


              <div>{movie.vote_average}</div>
              <div>{extractYearFromDate(movie.release_date)}</div>
              <div>{movie.original_title}</div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovies;
