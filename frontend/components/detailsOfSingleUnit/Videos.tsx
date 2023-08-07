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

const Videos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/346698/videos?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setVideos(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
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
            <Box>
              <img
                style={{
                  maxWidth: "100%",
                  height: "100vh",
                }}
                // TODO: youtubeは、5枚ぐらいの表示になるから現状ではおかしい
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt={video.name}
              />
              <Box>
                <div>{video.name}</div>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Videos;
