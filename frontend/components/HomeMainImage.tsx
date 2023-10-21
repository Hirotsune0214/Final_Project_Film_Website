import axios from "axios";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Box, Button, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import Link from "next/link";

import { Movie } from "@/src/state/category";

/******************************************************************************************/

const movieButton = {
  width: {
    xs: "170px",
    md: "170px",
    lg: "170px",
    xl: "180px",
  },
  height: {
    xs: "40px",
    lg: "45px",
    xl: "55px",
  },
  fontSize: {
    xs: "14px",
    md: "15px",
    xl: "17px",
  },
  color: "white",
  backgroundColor: "#FF0D01",
  padding: "10px",
  borderRadius: "10px",
  marginTop: "32px",
  "&:hover": {
    backgroundColor: "#ac0e06",
    opacity: "0.9",
  },
};

const HomeMainImage = () => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const [mainImages, setMainImages] = useState<Movie[]>([]);

  const fetchMainImage = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`
      );
      setMainImages(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMainImage();
  }, []);

  return (
    <div>
      <Swiper slidesPerView="auto" grabCursor={true} direction="horizontal">
        {mainImages.map((mainImage: Movie) => (
          <SwiperSlide key={mainImage.id}>
            <Box
              sx={{
                backgroundImage: `URL(${URL}${mainImage.backdrop_path})`,
                backgroundSize: {
                  xs: "cover",
                  md: "cover",
                  lg: "cover",
                  xl: "cover",
                },
                backgroundRepeat: "no-repeat",
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "100%",
                },
                height: {
                  xs: "45vh",
                  md: "50vh",
                  lg: "100vh",
                  xl: "100vh",
                },
                position: "relative",
                alignItems: "center",
                margin: {
                  xs: "13px 0 0 0",
                },
                padding: {
                  // lg: "10px 30px",
                  xl: "10px 0",
                },
                backgroundPosition: {
                  xs: "center",
                  md: "center",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  backgroundImage:
                    "linear-gradient(to right, rgb(245, 245, 245), rgba(0, 0, 0, 0))",
                }}
              ></Box>
              <Box
                sx={{
                  position: "absolute",
                  top: {
                    xs: "55%",
                    md: "55%",
                    lg: "42%",
                    xl: "42%",
                  },
                  left: {
                    xs: "42%",
                    md: "35%",
                    lg: "30%",
                    xl: "30%",
                  },
                  width: {
                    xs: "250px",
                    md: "450px",
                    lg: "450px",
                  },
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    fontSize: {
                      xs: "35px", // mobile
                      md: "36px", // tablet
                      lg: "40px", // laptop
                      xl: "70px", // monitor
                    },
                    width: {
                      xs: "335px",
                      md: "780px",
                      lg: "550px",
                      xl: "740px",
                    },
                    fontWeight: "bold",
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // 2行に制限
                    WebkitBoxOrient: "vertical",
                    whiteSpace: "normal",
                  }}
                >
                  {mainImage.title}
                </Box>

                <Box
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    color="success"
                    value={mainImage.vote_average * 10}
                    style={{ width: "50px", marginTop: "32px" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "73%",
                      left: "60%",
                      transform: "translate(-50%, -50%)",
                      color: "black",
                      fontSize: {
                        xs: "15px",
                        lg: "16px",
                        xl: "15px",
                      },
                      fontWeight: "700",
                    }}
                  >
                    {mainImage.vote_average}
                  </Box>
                </Box>
                <Box
                  sx={{
                    fontSize: {
                      xs: "20px",
                      md: "19px",
                      lg: "19px",
                      xl: "20px",
                    },
                    width: {
                      xs: "340px",
                      md: "700px",
                      lg: "450px",
                      xl: "700px",
                    },
                    lineHeight: {
                      xs: "27px",
                      md: "35px",
                      lg: "25px",
                      xl: "35px",
                    },
                    fontWeight: {
                      md: "500",
                      lg: "400",
                      xl: "530",
                    },
                    overflow: "hidden",
                    marginBottom: {
                      md: "10px",
                    },
                    letterSpacing: "0.02000em",
                    marginTop: "32px",
                    whiteSpace: "normal",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    textAlign: "left",
                  }}
                >
                  {mainImage.overview}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Link href={`/movies/${mainImage.id}`} passHref>
                    <Button sx={movieButton}>
                      <PlayArrowIcon
                        sx={{
                          marginRight: {
                            lg: "5px",
                            xl: "5px",
                          },
                        }}
                      />
                      WATCH NOW
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeMainImage;
