import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Typography, useMediaQuery } from "@mui/material";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

import YouTube from "react-youtube";

import { Category } from "@/src/state/category";
import theme from "@/src/theme/theme";

const Videos = ({ videos }: { videos: never[] }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const isMobileMode = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClickVideo = (index: number) => {
    setCurrentVideoIndex(index);
  };

  // 5つのみ動画を取得する
  const firstFiveVideos = videos.slice(0, 5);

  return (
    <Box
      id="sectionVideo"
      sx={{
        marginTop: {
          xl: "35px",
        },
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          position: "relative",
          left: {
            lg: "3em",
            xl: "11%",
          },
          margin: {
            xs: "40px 0 0 0",
            md: "10px 0 0 0",
            xl: "30px 0 0 0",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              md: "22px",
              lg: "24px",
              xl: "25px",
            },
            fontWeight: {
              xs: "bold",
              md: "bold",
              lg: "bold",
              xl: "bold",
            },
            letterSpacing: "0.5px",
            marginBottom: {
              md: "20px",
            },
            left: "6.5%",
          }}
        >
          VIDEOS
          <span
            style={{
              position: "absolute",
              top: "2rem",
              left: "3%",
              width: "90%",
              borderBottom: "7px solid red",
              borderRadius: "20px",
            }}
          ></span>
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: {
            xs: "40px",
            xl: "15px",
          },
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
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
          {firstFiveVideos.map((video: Category, index: number) => (
            <SwiperSlide key={video.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: {
                    xs: "35vh",
                    md: "35vh",
                    lg: "85vh",
                    xl: "77vh",
                  },
                  objectFit: "contain",
                }}
                onClick={() => handleClickVideo(index)}
              >
                {isMobileMode ? (
                  <Box>
                    <YouTube
                      videoId={video.key}
                      opts={{
                        width: "auto",
                        height: "350",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : (
                  <Box>
                    <YouTube
                      videoId={video.key}
                      opts={{
                        width: "1000",
                        height: "500",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Videos;
