import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Typography } from "@mui/material";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

import YouTube from "react-youtube";

import { Category } from "@/src/state/category";

const Videos = ({ videos }: { videos: never[] }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const handleClickVideo = (index: number) => {
    setCurrentVideoIndex(index);
  };

  // 5つのみ動画を取得する
  const firstFiveVideos = videos.slice(0, 5);

  return (
    <Box
      id="sectionVideo"
      sx={{
        position: "relative",
        top: {
          md: "12rem",
          lg: "8rem",
          xl: "10rem",
        },
        left: {
          xl: "7%",
        },
      }}
    >
      <Box
        sx={{
          display: "inline-block",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              md: "22px",
              lg: "24px",
              xl: "25px",
            },
            fontWeight: {
              md: "bold",
              lg: "bold",
              xl: "bold",
            },
            letterSpacing: "0.5px",
            marginBottom: {
              md: "20px",
            },
          }}
        >
          VIDEOS
          <span
            style={{
              position: "absolute",
              top: "2rem",
              left: "0",
              width: "6%",
              borderBottom: "7px solid red",
              borderRadius: "20px",
            }}
          ></span>
        </Typography>
      </Box>
      <Box sx={{ width: "1300px" }}>
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          direction="horizontal"
          navigation={true}
          modules={[Navigation, Pagination]}
          pagination={{
            dynamicBullets: true,
          }}
          // spaceBetween={30}
          // centeredSlides={true}
        >
          {firstFiveVideos.map((video: Category, index: number) => (
            <SwiperSlide key={video.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: {
                    md: "105vh",
                    lg: "100vh",
                    xl: "77vh",
                  },
                  objectFit: "contain",
                }}
                onClick={() => handleClickVideo(index)}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <YouTube
                    videoId={video.key}
                    opts={{
                      width: "1000",
                      height: "550",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Videos;
