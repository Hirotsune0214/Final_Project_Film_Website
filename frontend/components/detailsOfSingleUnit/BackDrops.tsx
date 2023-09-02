import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

import { Movie } from "@/src/state/category";

const BackDrops = ({ backdrops }: { backdrops: never[] }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

  return (
    <div>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
          margin: "20px 0",
        }}
      >
        BACK DROPS
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "90%",
            borderBottom: "7px solid red",
            borderRadius: "20px",
          }}
        ></span>
      </h1>
      <Swiper
        slidesPerView={1}
        grabCursor={true}
        direction="horizontal"
        navigation={true}
        modules={[Navigation, Pagination]}
        pagination={{
          dynamicBullets: true,
          // clickable: true,
        }}
      >
        {backdrops.map((backdrop: Movie) => (
          <SwiperSlide key={backdrop.file_path}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "750px",
              }}
            >
              <img
                style={{
                  width: "1150px",
                  objectFit: "cover",
                  height: "680px",
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
