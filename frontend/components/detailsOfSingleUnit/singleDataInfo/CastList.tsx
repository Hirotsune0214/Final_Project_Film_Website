import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface films {
  id: string;
  profile_path: string;
  name: string;
}

const CastList = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [casts, setCasts] = useState([]);

  const fetchCasts = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/346698/credits?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setCasts(response.data.cast);
      // console.log(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCasts();
  }, []);

  return (
    <div>
      <h1>CAST</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {casts.map((cast: films) => (
          <SwiperSlide key={cast.id}>
            <Box>
              <img
                style={{
                  maxWidth: "%",
                  height: "40vh",
                }}
                src={`${URL}${cast.profile_path}`}
                alt={cast.name}
              />
              <Box>
                <div>{cast.name}</div>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastList;
