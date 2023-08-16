import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Posters = ({ id }: { id: string }) => {
  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL

  const [posters, setPosters] = useState([]);

  const fetchPosters = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setPosters(response.data.posters);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, [id]);

  return (
    <div>
      <h1>POSTERS</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {posters.map((poster: any) => (
          <SwiperSlide key={poster.file_path}>
            <Box>
              <img
                style={{ width: "100%" }}
                src={`${URL}${poster.file_path}`}
                alt={poster.title}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Posters;
