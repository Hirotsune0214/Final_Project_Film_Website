import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

import { RecommendLaptopMonitorCss } from "@/pages/movies/[id]";
import { RecommendMobileTabletCss } from "@/pages/movies/[id]";

import { Recommend } from "@/src/state/category";
import theme from "@/src/theme/theme";

type Props = {
  recommends: Recommend[];
  extractYearFromDate: (dateString: string | undefined) => string;
};

const Recommend = ({ recommends, extractYearFromDate }: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const [ishover, setIshover] = useState(false);

  const isMobileMode = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        left: {
          xl: "7%",
        },
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          position: "relative",
          margin: "30px 0 20px 0",
          left: {
            lg: "1.3em",
            xl: "5em",
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
          YOU MAY ALSO LIKE
          <span
            style={{
              position: "absolute",
              top: "2.1rem",
              left: "0",
              width: "90%",
              borderBottom: "7px solid red",
              borderRadius: "20px",
            }}
          ></span>
        </Typography>
      </Box>

      <Swiper
        slidesPerView={4}
        breakpoints={{
          375: {
            slidesPerView: 2,
            // spaceBetween: 10,
          },
          520: {
            slidesPerView: 3,
          },
          // 960px以上(laptop)になると3になる
          960: {
            slidesPerView: 4,
          },
          // 1200px(monitor)以上になると5になる
          1200: {
            slidesPerView: 5,
          },
        }}
        grabCursor={true}
        direction="horizontal"
      >
        {recommends.map((recommend: Recommend) => (
          <SwiperSlide key={recommend.id}>
            <Link
              href={
                recommend.title
                  ? `/movies/${recommend.id}`
                  : `/dramas/${recommend.id}`
              }
              passHref
            >
              <Box
                onMouseEnter={() => {
                  setIshover(true);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                }}
                sx={
                  isMobileMode
                    ? RecommendMobileTabletCss
                    : RecommendLaptopMonitorCss
                }
              >
                <Box
                  component="img"
                  className="image"
                  sx={{
                    width: {
                      xs: "100%",
                      md: "100%",
                      lg: "90%",
                      xl: "90%",
                    },
                    height: {
                      xs: "30vh",
                      md: "35vh",
                      lg: "59vh",
                    },
                    zIndex: "1",
                    margin: {
                      md: "15px 0 0 0",
                      lg: "40px 0 25px 10px",
                      xl: "25px 0 25px 7px",
                    },
                    borderRadius: {
                      md: "0px",
                      lg: "10px",
                      xl: "10px",
                    },
                    objectFit: "contain",
                  }}
                  src={`${URL}${recommend.poster_path}`}
                  alt={recommend.title}
                ></Box>
                (
                <Box className="text">
                  {recommend.title ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          position: "absolute",
                          bottom: "25px",
                          left: "20px",
                          fontSize: "20px",
                          textAlign: "left",
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          color="success"
                          value={recommend.vote_average * 10}
                          style={{ width: "40px" }}
                        />
                        <Box
                          sx={{
                            position: "fixed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "40px",
                            height: "40px",
                            color: "white",
                            fontSize: {
                              lg: "14px",
                            },
                            fontWeight: "100",
                            left: "20px",
                          }}
                        >
                          {recommend.vote_average.toFixed(1)}
                        </Box>
                        <Box
                          sx={{
                            marginTop: "12px",
                            fontSize: {
                              lg: "16px",
                            },
                          }}
                        >
                          {extractYearFromDate(recommend.release_date)}
                        </Box>
                        <Box
                          sx={{
                            alignSelf: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: {
                              md: "220px",
                              lg: "200px",
                              xl: "220px",
                            },
                            marginTop: "12px",
                            fontSize: {
                              lg: "16px",
                            },
                          }}
                        >
                          {recommend.title}
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          position: "absolute",
                          bottom: "25px",
                          left: "20px",
                          fontSize: "20px",
                          textAlign: "left",
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          color="success"
                          value={recommend.vote_average * 10}
                          style={{ width: "40px" }}
                        />
                        <div
                          style={{
                            position: "fixed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "40px",
                            height: "40px",
                            color: "white",
                            fontSize: "18px",
                            fontWeight: "100",
                            left: "20px",
                          }}
                        >
                          {recommend.vote_average.toFixed(1)}
                        </div>
                        <div style={{ marginTop: "8px" }}>
                          {extractYearFromDate(recommend.first_air_date)}
                        </div>
                        <div
                          style={{
                            alignSelf: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "250px",
                            fontWeight: "300",
                            marginTop: "8px",
                          }}
                        >
                          {recommend.name}
                        </div>
                      </div>
                    </>
                  )}
                </Box>
                )
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Recommend;
