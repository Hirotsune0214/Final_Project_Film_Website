import { Box, CircularProgress } from "@mui/material";
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
                            {extractYearFromDate(recommend.release_date)}
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            {recommend.title}
                          </div>
                        </div>
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
    </div>
  );
};

export default Recommend;
