import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Posters = ({ posters }: { posters: any[] }) => {
  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL

  return (
    <div>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
          margin: "40px 0 40px 0",
        }}
      >
        POSTERS
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "88%",
            borderBottom: "7px solid red",
            borderRadius: "20px",
          }}
        ></span>
      </h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {posters.map((poster: any) => (
          <SwiperSlide key={poster.file_path}>
            <Box>
              <img
                style={{ width: "100%", height: "65vh" }}
                src={`${URL}${poster.file_path}`}
                alt={poster.title}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Posters;
