import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

const BackDrops = () => {
  const URL = "https://image.tmdb.org/t/p/original"; // ポスター画像のベースURL

  const [backdrops, serBackDrops] = useState([]);

  const fetchBackdrops = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=bb46848237eacc0a36827f6639b47ee3&query=barbie&include_adult=false&language=en-US&page=1"
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
      <Swiper
        slidesPerView={1}
        grabCursor={true}
        direction="horizontal"
        navigation={true}
        modules={[Navigation, Pagination]}
        pagination={{
          dynamicBullets: true,
        }}
      >
        {backdrops.map((backdrop: any) => (
          <SwiperSlide key={backdrop.id}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
            >
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={`${URL}${backdrop.backdrop_path}`}
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
