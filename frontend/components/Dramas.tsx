import React, { useEffect, useState } from "react";

import axios from "axios";

import { Box, Button, CircularProgress } from "@mui/material";

import Link from "next/link";

import { Drama } from "@/src/state/category";

import { MovieDramaCss } from "@/pages/dramas";

/******************************************************************************************/

// type DramaLists = "popular" | "top_rated";

interface Props {
  dramas: Drama[];
  dramaLists: string;
  setDramaLists: (category: string) => void;
  extractYearFromDate: (dateString: string) => string;
  handleAddDramasPages: () => void;
}

const Dramas = ({
  dramas,
  dramaLists,
  setDramaLists,
  extractYearFromDate,
  handleAddDramasPages,
}: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const [ishover, setIshover] = useState(false);

  // const fetchNewPageDramas = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/tv/${movieLists}?page=${currentPage}&api_key=bb46848237eacc0a36827f6639b47ee3`
  //     );

  //     setDramas((prevPageLists) => [
  //       ...prevPageLists,
  //       ...response.data.results,
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleAddDramasPages = () => {
  //   // 引数のprevPageは前の値を持っている
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  // useEffect(() => {
  //   if (currentPage > 1) {
  //     // Only fetch new pages after the initial load
  //     fetchNewPageDramas();
  //   }
  // }, [currentPage]);

  return (
    <div
      style={{ display: "block", padding: "16px", backgroundColor: "#F5F5F5" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0 50px 0",
        }}
      >
        <h1>TV Series</h1>

        <Box>
          <Button
            onClick={() => setDramaLists("popular")}
            sx={{
              backgroundColor: dramaLists === "popular" ? "red" : "transparent",
              color: dramaLists === "popular" ? "#ffffff" : "#000000",
              padding: "15px",
              marginRight: "10px",
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
          >
            POPULAR
          </Button>
          <Button
            onClick={() => setDramaLists("top_rated")}
            sx={{
              backgroundColor:
                dramaLists === "top_rated" ? "red" : "transparent",
              color: dramaLists === "top_rated" ? "#ffffff" : "#000000",
              padding: "15px",
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
          >
            TOP RATED
          </Button>
        </Box>
      </div>
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
        {dramas.map((drama: Drama) => (
          <Link href={`/dramas/${drama.id}`} passHref>
            <Box
              onMouseEnter={() => {
                setIshover(true);
              }}
              onMouseLeave={() => {
                setIshover(false);
              }}
              sx={MovieDramaCss}
              key={drama.id}
            >
              <img
                className="img"
                src={`${URL}${drama.poster_path}`}
                alt={drama.name}
                style={{
                  width: "99%",
                  height: "65vh",
                  objectFit: "cover",
                  zIndex: "1",
                  borderRadius: "10px",
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
                  <div>{extractYearFromDate(drama.first_air_date)}</div>
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
                    {drama.name}
                  </div>
                </div>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "45px",
        }}
      >
        <Button
          sx={{
            color: "#FF0000",
            fontSize: "20px",
            fontWeight: "bold",
            ":hover": {
              color: "white",
              backgroundColor: "red",
              opacity: 0.8,
            },
          }}
          onClick={() => handleAddDramasPages()}
        >
          LOAD MORE
        </Button>
      </div>
    </div>
  );
};

export default Dramas;
