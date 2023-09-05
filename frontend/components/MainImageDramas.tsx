import axios from "axios";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Link from "next/link";

import { Drama } from "@/src/state/category";

import { Box, Button, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
/******************************************************************************************/

const MainImageDramas = ({ dramas }: { dramas: Drama[] }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

  const dramaButton = {
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
        {dramas.map((drama: Drama) => (
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
                  {drama.name}
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
                    value={drama.vote_average * 10}
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
                    {drama.vote_average}
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
                  {drama.overview}
                </div>
                <Link href={`/dramas/${drama.id}`} passHref>
                  <Button sx={dramaButton}>
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

export default MainImageDramas;
