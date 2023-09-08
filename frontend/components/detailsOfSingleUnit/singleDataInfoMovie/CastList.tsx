import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Category } from "@/src/state/category";

const CastList = ({ casts }: { casts: never[] }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  return (
    <div style={{ marginTop: "40px" }}>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        CAST
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "85%",
            borderBottom: "7px solid red",
            borderRadius: "20px",
          }}
        ></span>
      </h1>

      <Swiper
        slidesPerView={4}
        grabCursor={true}
        direction="horizontal"
        spaceBetween={1}
      >
        {casts.map((cast: Category) => (
          <SwiperSlide key={cast.id}>
            <Link href={`/person/${cast.id}`} passHref>
              <Box>
                {cast.profile_path ? (
                  <img
                    style={{
                      width: "175px",
                      height: "35vh",
                      objectFit: "cover",
                      marginTop: "20px",
                    }}
                    src={`${URL}${cast.profile_path}`}
                    alt={cast.name}
                  />
                ) : (
                  <div
                    className="img"
                    style={{
                      width: "175px",
                      height: "277px",
                      marginTop: "20px",
                      backgroundColor: "darkgrey",
                    }}
                  ></div>
                )}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
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
                  <div
                    style={{
                      width: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cast.name}
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

export default CastList;
