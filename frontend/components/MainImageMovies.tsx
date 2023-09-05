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
    <div>
      <Swiper slidesPerView="auto" grabCursor={true} direction="horizontal">
        {movies.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                backgroundImage: `URL(${URL}${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  backgroundImage:
                    "linear-gradient(to right, rgb(245, 245, 245), rgba(0, 0, 0, 0))",
                }}
              ></div>
              <Box
                sx={{
                  position: "absolute",
                  top: "42%",
                  left: "30%",
                  width: "450px",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "450px",
                    fontSize: "35px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {movie.title}
                </div>
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
                  <div
                    style={{
                      position: "absolute",
                      top: "73%",
                      left: "60%",
                      // TODO: x軸とy軸に移動させる
                      transform: "translate(-50%, -50%)", // 中央に寄せる
                      color: "black",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    {movie.vote_average}
                  </div>
                </Box>
                <div
                  style={{
                    width: "450px",
                    fontSize: "20px",
                    fontWeight: "400",
                    letterSpacing: "0.02000em",
                    // margin: "32px 0 0 50px",
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
                </div>
                <Link href={`/movies/${movie.id}`} passHref>
                  <Button sx={movieButton}>
                    <PlayArrowIcon />
                    WATCH NOW
                  </Button>
                </Link>
              </Box>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainImageMovies;
