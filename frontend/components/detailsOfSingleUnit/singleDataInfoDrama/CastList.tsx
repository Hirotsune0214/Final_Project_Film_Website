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

const CastList = ({ casts }: { casts: any }) => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  return (
    <div>
      <h1>CAST</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {casts.map((cast: films) => (
          <SwiperSlide key={cast.id}>
            <Box>
              <img
                style={{
                  maxWidth: "70%",
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
