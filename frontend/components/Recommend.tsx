import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

import { RecommendCss } from "@/pages/movies/[id]";

import { Recommend } from "@/src/state/category";

type Props = {
  recommends: Recommend[];
  extractYearFromDate: (dateString: string | undefined) => string;
};

const Recommend = ({ recommends, extractYearFromDate }: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const [ishover, setIshover] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        top: {
          md: "17rem",
          lg: "13rem",
          xl: "15rem",
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
          }}
        >
          YOU MAY ALSO LIKE
          <span
            style={{
              position: "absolute",
              top: "2.3rem",
              left: "0",
              width: "8%",
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
            spaceBetween: 10,
          },
          520: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          // 960px以上(laptop)になると3になる
          960: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // 1200px(monitor)以上になると5になる
          1200: {
            slidesPerView: 4.5,
            spaceBetween: 80,
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
                sx={RecommendCss}
              >
                <Box
                  component="img"
                  className="image"
                  sx={{
                    width: {
                      md: "100%",
                      lg: "100%",
                    },
                    height: {
                      md: "70vh",
                      lg: "60vh",
                    },
                    zIndex: "1",
                    margin: {
                      lg: "50px 0 25px 9px",
                      xl: "50px 0 25px 9px",
                    },
                    borderRadius: "10px",
                  }}
                  src={`${URL}${recommend.poster_path}`}
                  alt={recommend.title}
                ></Box>

                {ishover && (
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
                )}
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Recommend;
