import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import { Favorite } from "@/src/state/category";

import { favoriteCss } from "@/pages/favorites";

import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  favorites: never[];
  extractYearFromDate: (dateString: string) => string;
  handleDelete: () => void;
};

const Favorites = ({ favorites, extractYearFromDate, handleDelete }: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;
  const [ishover, setIshover] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState(8);
  const moviesToShow = 8;

  return (
    <>
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
        {favorites.map((favorite: Favorite) => (
          <Box
            onMouseEnter={() => {
              setIshover(true);
            }}
            onMouseLeave={() => {
              setIshover(false);
            }}
            sx={favoriteCss}
          >
            <img
              className="img"
              src={`${URL}${favorite.picture}`}
              alt={favorite.title}
              style={{
                width: "95%",
                height: "95%",
                objectFit: "cover",
                zIndex: "1",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            />
            <Box className="text">
              <div>{favorite.vote_average}</div>
              <div>{extractYearFromDate(favorite.date)}</div>
              <div>{favorite.title}</div>
            </Box>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
      {/* <Button
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
        onClick={() => setVisibleMovies(visibleMovies + moviesToShow)}
      >
        LOAD MORE
      </Button> */}
    </>
  );
};

export default Favorites;
