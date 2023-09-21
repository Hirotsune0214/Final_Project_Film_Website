import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Box, Button, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import Link from "next/link";

import { Movie } from "@/src/state/category";
/******************************************************************************************/

const MainImageMovies = ({ movies }: { movies: Movie[] }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

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

  return (
    <Box>
      <Swiper slidesPerView="auto" grabCursor={true} direction="horizontal">
        {movies.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <Box
              sx={{
                backgroundImage: `URL(${URL}${movie.backdrop_path})`,
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
                  xs: "67vh",
                  md: "85vh",
                  lg: "100vh",
                  xl: "100vh",
                },
                position: "relative",
                alignItems: "center",
                marginTop: {
                  xs: "13px",
                },
                padding: "10px 0",
                backgroundPosition: {
                  xs: "center",
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
                    md: "42%",
                    lg: "42%",
                    xl: "42%",
                  },
                  left: {
                    xs: "42%",
                    md: "30%",
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
                      md: "35px", // tablet
                      lg: "40px", // laptop
                      xl: "70px", // monitor
                    },
                    width: {
                      xs: "335px",
                      md: "900px",
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
                  {movie.title}
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
                    value={movie.vote_average * 10}
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
                        md: "15px",
                        lg: "16px",
                        xl: "15px",
                      },
                      fontWeight: "700",
                    }}
                  >
                    {movie.vote_average}
                  </Box>
                </Box>
                <Box
                  sx={{
                    fontSize: {
                      xs: "20px",
                      lg: "19px",
                      xl: "20px",
                    },
                    width: {
                      xs: "340px",
                      md: "900px",
                      lg: "450px",
                      xl: "700px",
                    },
                    lineHeight: {
                      xs: "27px",
                      md: "30px",
                      lg: "25px",
                      xl: "35px",
                    },
                    fontWeight: {
                      md: "lighter",
                      lg: "400",
                      xl: "530",
                    },
                    letterSpacing: "0.02000em",
                    marginTop: "32px",
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    textAlign: "left",
                  }}
                >
                  {movie.overview}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Link href={`/movies/${movie.id}`} passHref>
                    <Button sx={movieButton}>
                      <PlayArrowIcon />
                      WATCH NOW
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MainImageMovies;
