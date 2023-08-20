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
        {videos.map((video: MoviesData, index: number) => (
          <SwiperSlide key={video.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "70vh",
              }}
              onClick={() => handleClickVideo(index)}
            >
              {/* {videos[currentVideoIndex] && (
                <YouTube
                  videoId={videos[currentVideoIndex].key}
                  opts={{
                    width: "1300",
                    height: "700",
                  }}
                />
              )}
              {video.name} */}
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <YouTube
                  videoId={video.key}
                  opts={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    color: "#fff",
                    background: "rgba(0, 0, 0, 0.6)",
                    padding: "5px",
                  }}
                >
                  {video.name}
                </div>
              </div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Videos;
