import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

// interfaceを使い回して良いのか
interface SeriesData {
  id: string;
  poster_path: string;
  name: string;
  original_title: string;
  first_air_date: string;
  vote_average: number;
  backdrop_path: "string";
}

const Movies = () => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [dramas, setDramas] = useState<SeriesData[]>([]);
  const [ishover, setIshover] = useState(false);

  const fetchPopularDramas = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setDramas(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopRatedDramas = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setDramas(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
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
      transform: "scale(1.04)",
      opacity: "1",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
    },
    "& .text": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.6)",
      transition: ".3s ease-in-out",
      opacity: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  useEffect(() => {
    fetchPopularDramas();
  }, []);

  const handleDramasPopularButton = () => {
    fetchPopularDramas();
  };

  const handleDramasTopRatedButton = () => {
    fetchTopRatedDramas();
  };

  return (
    <div style={{ display: "block", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>TV Series</h1>

        <div>
          <button onClick={handleDramasPopularButton}>POPULAR</button>
          <button onClick={handleDramasTopRatedButton}>TOP RATED</button>
        </div>
      </div>
      <Box
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "9px",
          rowGap: "14px",
          cursor: "pointer",
        }}
      >
        {dramas.map((drama: SeriesData) => (
          <Box
            onMouseEnter={() => {
              setIshover(true);
            }}
            onMouseLeave={() => {
              setIshover(false);
            }}
            sx={boxSX}
            key={drama.id}
          >
            <img
              className="img"
              src={`${URL}${drama.poster_path}`}
              alt={drama.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box className="text">
              <div>{drama.name}</div>
              <div>{extractYearFromDate(drama.first_air_date)}</div>
              <div>{drama.vote_average}</div>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Movies;
