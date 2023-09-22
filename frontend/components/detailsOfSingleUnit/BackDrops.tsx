import { Box, Typography } from "@mui/material";
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
    <Box
      sx={{
        marginTop: {
          lg: "50px",
        },
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          position: "relative",
          margin: "30px 0 50px 0",
          left: {
            xl: "9em",
          },
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
          }}
        >
          BACK DROPS
          <span
            style={{
              position: "absolute",
              top: "2rem",
              left: "0",
              width: "95%",
              borderBottom: "7px solid red",
              borderRadius: "20px",
            }}
          ></span>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          
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
          {backdrops.map((backdrop: Movie) => (
            <SwiperSlide key={backdrop.file_path}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  height: {
                    md: "600px",
                    lg: "630px",
                    xl: "73vh",
                  },
                }}
              >
                <img
                  style={{
                    width: "1000px",
                    height: "530px",
                    objectFit: "contain",
                  }}
                  src={`${URL}${backdrop.file_path}`}
                  alt={backdrop.title}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default BackDrops;
