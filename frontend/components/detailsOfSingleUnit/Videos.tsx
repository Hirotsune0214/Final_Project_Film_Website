import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@mui/material";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

import YouTube from "react-youtube";

interface MoviesData {
  id: string;
  key: string;
  name: string;
}

const Videos = ({ videos }: { videos: any }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const handleClickVideo = (index: number) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div id="sectionVideo">
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        VIDEOS
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "85%",
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
        }}
      >
        {videos.map((video: MoviesData, index: number) => (
          <SwiperSlide key={video.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "70vh",
                objectFit: "cover",
                margin: "90px 0 60px 0",
              }}
              onClick={() => handleClickVideo(index)}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  objectFit: "cover",
                }}
              >
                <YouTube
                  videoId={video.key}
                  opts={{
                    width: "1250",
                    height: "700",
                  }}
                />
              </div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Videos;
