import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

interface MoviePic {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

const BackDrops = ({ backdrops }: { backdrops: any[] }) => {
  const URL = "https://image.tmdb.org/t/p/original"; // ポスター画像のベースURL

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
          <SwiperSlide key={backdrop.file_path}>
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
                src={`${URL}${backdrop.file_path}`}
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
