import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Button, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";

// interfaceを使い回して良いのか
interface Series {
  id: String;
  poster_path: String;
  title: String;
  original_title: String;
  release_date: String;
  vote_average: number;
  overview: String;
  backdrop_path: String;
}

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

const HomeMainImage = () => {
  const URL = "https://image.tmdb.org/t/p/original"; // ポスター画像のベースURL

  const [dramas, setDramas] = useState<Series[]>([]);

  const fetchDramas = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setDramas(response.data.results);

      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDramas();
  }, []);

  return (
    <div style={{}}>
      {/* Swiperコンポーネント */}
      <Swiper slidesPerView="auto" grabCursor={true} direction="horizontal">
        {dramas.map((drama: Series) => (
          <SwiperSlide key={drama.id}>
            <div
              style={{
                backgroundImage: `URL(${URL}${drama.backdrop_path})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                position: "relative",
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
                  top: "33%",
                  left: "20%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "black",
                }}
              >
                <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                  {drama.original_title}
                </div>
                <div style={{ fontSize: "20px", marginTop: "32px" }}>
                  <CircularProgress
                    variant="determinate"
                    value={drama.vote_average * 10}
                  />
                  {drama.vote_average}
                </div>
                {/* <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "400",
                    letterSpacing: "0.02000em",
                    marginTop: "32px",
                    textAlign: "justify",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {drama.overview}
                </div> */}
                <Link href={`/movies/${drama.id}`} passHref>
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

export default HomeMainImage;
