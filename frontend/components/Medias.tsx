import { Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import { Recommend } from "../src/state/category";
import { personCss } from "@/pages/person/[id]";
import { Toaster, toast } from "react-hot-toast";

type Props = {
  personCasts: Recommend[];
  extractYearFromDate: (dateString: string) => string;
};

const Medias = ({ extractYearFromDate, personCasts }: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const [visibleMovies, setVisibleMovies] = useState(8);
  const moviesToShow = 8;

  const handleLoadMore = () => {
    toast.loading("Fetching new page");
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + moviesToShow);

    toast.dismiss();
    toast.success("New page fetched successfully", {
      duration: 1500, // 1.5秒間表示後に自動的に非表示にする
    });
  };

  return (
    <>
      <Toaster />
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        MEDIAS
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
      <Box
        sx={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "5px",
          rowGap: "48px",
          cursor: "pointer",
        }}
      >
        {personCasts.slice(0, visibleMovies).map((personCast: Recommend) => (
          <Link
            href={
              personCast.title
                ? `/movies/${personCast.id}`
                : `/dramas/${personCast.id}`
            }
            passHref
          >
            <Box key={personCast.title} sx={personCss}>
              <img
                className="img"
                src={`${URL}${personCast.poster_path}`}
                alt={personCast.title}
                style={{
                  width: "95%",
                  height: "57vh",
                  objectFit: "cover",
                  zIndex: "1",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
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
                    value={personCast.vote_average * 10}
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
                    {personCast.vote_average.toFixed(1)}
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    {extractYearFromDate(personCast.release_date)}
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
                    {personCast.title}
                  </div>
                </div>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
      {visibleMovies < personCasts.length && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            sx={{
              color: "#FF0000",
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "20px",
              ":hover": {
                color: "white",
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
            // onClick={() => setVisibleMovies(visibleMovies + moviesToShow)}
            onClick={handleLoadMore}
          >
            LOAD MORE
          </Button>
        </Box>
      )}
    </>
  );
};

export default Medias;
