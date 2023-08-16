import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@mui/material";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

interface MoviesData {
  id: string;
  key: string;
  name: string;
}

const Videos = ({ videos }: { videos: any }) => {
  return (
    <div id="sectionVideo">
      <h1>VIDEOS</h1>
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
        {videos.map((video: MoviesData) => (
          <SwiperSlide key={video.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <img
                style={{
                  width: "70%",
                  maxHeight: "80vh",
                }}
                src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                alt={video.name}
              />
              {/* タイトルを画像の中に入れて修正する */}
              {/* <Box>
                <div>{video.name}</div>
              </Box> */}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Videos;
