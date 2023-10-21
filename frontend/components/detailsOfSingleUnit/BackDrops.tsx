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
          margin: {
            xs: "50px 0 20px 0",
            md: "50px 0",
            lg: "30px 0 50px 0",
            xl: "30px 0 50px 0",
          },
          left: {
            lg: "5em",
            xl: "9em",
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
                    xs: "27vh",
                    md: "45vh",
                    lg: "90vh",
                    xl: "73vh",
                  },
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: {
                      xs: "330px",
                      md: "750px",
                      lg: "1000px",
                      xl: "1000px",
                    },
                    height: {
                      xs: "25vh",
                      md: "45vh",
                      lg: "530px",
                      xl: "530px",
                    },
                    objectFit: "contain",
                  }}
                  src={`${URL}${backdrop.file_path}`}
                  alt={backdrop.title}
                ></Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default BackDrops;
