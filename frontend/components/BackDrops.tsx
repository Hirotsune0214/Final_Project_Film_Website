import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const BackDrops = () => {
  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL

  const [backdrops, serBackDrops] = useState([]);

  const fetchBackdrops = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      serBackDrops(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBackdrops();
  }, []);

  return (
    <div>
      <h1>BACK DROPS</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {backdrops.map((backdrop: any) => (
          <SwiperSlide key={backdrop.id}>
            <Box>
              <img
                style={{ width: "100%" }}
                src={`${URL}${backdrop.poster_path}`}
                alt={backdrop.title}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BackDrops;
