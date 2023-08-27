import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

// interfaceを使い回して良いのか
interface films {
  id: string;
  poster_path: string;
  original_name: string;
  vote_average: number;
  first_air_date: string;
}

const PopularMSeries = (sx: any) => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [dramas, setDramas] = useState([]);
  const [ishover, setIshover] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setDramas(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const { sx: boxSX } = sx;

  return (
    <div>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        POPULAR SERIES
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "45%",
            borderBottom: "7px solid red",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        ></span>
      </h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {dramas.map((drama: films) => (
          <SwiperSlide key={drama.id}>
            <Link href={`/dramas/${drama.id}`} passHref>
              <Box
                onMouseEnter={() => {
                  setIshover(true);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                }}
                sx={boxSX}
              >
                <img
                  className="img"
                  style={{
                    width: "92%",
                    height: "60vh",
                    zIndex: "1",
                    margin: "50px 0 25px 10.5px",
                    borderRadius: "10px",
                  }}
                  src={`${URL}${drama.poster_path}`}
                  alt={drama.original_name}
                />
                <Box className="text">
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
                      value={drama.vote_average * 10}
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
                      {drama.vote_average}
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      {extractYearFromDate(drama.first_air_date)}
                    </div>
                    <div
                      style={{
                        alignSelf: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "250px",
                        fontWeight: "500",
                        marginTop: "8px",
                      }}
                    >
                      {drama.original_name}
                    </div>
                  </div>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default PopularMSeries;
