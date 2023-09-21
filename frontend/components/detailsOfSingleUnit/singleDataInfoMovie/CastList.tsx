import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Category } from "@/src/state/category";

const CastList = ({ casts }: { casts: never[] }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  return (
    <Box
      sx={{
        marginTop: {
          md: "30px",
          lg: "40px",
          xl: "50px",
        },
        width: {
          md: "700px",
          lg: "730px",
        },
      }}
    >
      <Typography
        component="h1"
        sx={{
          display: "inline-block",
          position: "relative",
          fontSize: {
            md: "20px",
            lg: "25px",
            xl: "30px",
          },
          fontWeight: {
            md: "bold",
            lg: "normal",
            xl: "normal",
          },
        }}
      >
        CAST
        <span
          style={{
            position: "absolute",
            bottom: "-6px",
            left: "0",
            width: "85%",
            borderBottom: "7px solid red",
            borderRadius: "20px",
          }}
        ></span>
      </Typography>
      <Box
        sx={{
          width: {
            lg: "680px",
          },
        }}
      >
        <Swiper
          slidesPerView={4}
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            520: {
              slidesPerView: 2,
              spaceBetween: 70,
            },
            // 960px以上(laptop)になると3になる
            960: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            // 1200px(monitor)以上になると5になる
            1200: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
          }}
          grabCursor={true}
          direction="horizontal"
        >
          {casts.map((cast: Category) => (
            <SwiperSlide key={cast.id}>
              <Link href={`/person/${cast.id}`} passHref>
                <Box>
                  {cast.profile_path ? (
                    <Box
                      component="img"
                      sx={{
                        width: {
                          md: "350px",
                          lg: "160px",
                          xl: "150px",
                        },
                        height: {
                          md: "90vh",
                          lg: "35vh",
                          xl: "25vh",
                        },
                        objectFit: {
                          md: "cover",
                          lg: "cover",
                          xl: "cover",
                        },
                        marginTop: {
                          md: "30px",
                          lg: "20px",
                          xl: "30px",
                        },
                      }}
                      src={`${URL}${cast.profile_path}`}
                      alt={cast.name}
                    ></Box>
                  ) : (
                    <Box
                      className="img"
                      sx={{
                        width: {
                          xl: "175px",
                        },
                        height: {
                          lg: "277px",
                          xl: "25.8vh",
                        },
                        marginTop: "18px",
                        backgroundColor: "darkgrey",
                      }}
                    ></Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      width: "160%",
                      height: "max-content",
                      bottom: "4px",
                      padding: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "rgba(219, 219, 219, 0.9)",
                      fontSize: "18px",
                      lineHeight: "1.5",
                      letterSpacing: "0.00938em",
                      display: "flex",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: {
                          lg: "150px",
                        },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cast.name}
                    </Box>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default CastList;
