import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

interface films {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  name: string;
  first_air_date: string;
}

const Recommend = ({ recommends }: any) => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [ishover, setIshover] = useState(false);

  const extractYearFromDate = (dateString: string | undefined): string => {
    if (dateString && dateString.length >= 4) {
      return dateString.substring(0, 4);
    } else {
      return "Unknown"; // もしくは、適切なデフォルト値を返す
    }
  };

  const boxSX = {
    maxWidth: "500px",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    background: "cover",
    "&:hover .text": {
      opacity: 1,
    },
    "&:hover .img": {
      transform: "scale(1.05) translateY(-10px)",
      transition: ".3s ease-in-out",
      position: "relative",
      zIndex: "2",
      // TODO: 下記2つの色の微調整を行う
      boxShadow: "8px -9px 20px -2px rgba(119,119,119,0.7)",
      borderColor: "rgba(11, 64, 188, 0.775)",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2s",
      border: "4px solid transparent",
    },
    "& .text": {
      position: "absolute",
      width: "93%",
      height: "57.5vh",
      top: 0,
      left: 0,
      textAlign: "center",
      color: "#fff",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
      transition: ".3s ease-in-out",
      opacity: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transform: "scale(1.05)",
      zIndex: "2",
      marginTop: "65.1px",
      marginLeft: "11.5px",
      borderRadius: "10px",
    },
  };

  return (
    <div>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        YOU MAY ALSO LIKE
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "45%",
            borderBottom: "7px solid red",
            borderRadius: "20px",
          }}
        ></span>
      </h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {recommends.map((recommend: films) => (
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
                sx={boxSX}
              >
                <img
                  className="img"
                  style={{
                    width: "91.7%",
                    height: "60vh",
                    zIndex: "1",
                    margin: "50px 0 25px 10.5px",
                    borderRadius: "10px",
                  }}
                  src={`${URL}${recommend.poster_path}`}
                  alt={recommend.title}
                />

                {ishover && (
                  <Box className="text">
                    {recommend.title ? (
                      <>
                        <div>{recommend.title}</div>
                        <div>{extractYearFromDate(recommend.release_date)}</div>

                        <div>{recommend.vote_average.toFixed(1)}</div>
                      </>
                    ) : (
                      <>
                        <div>{recommend.name}</div>
                        <div>
                          {extractYearFromDate(recommend.first_air_date)}
                        </div>
                        <div>{recommend.vote_average.toFixed(1)}</div>
                      </>
                    )}
                  </Box>
                )}
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
