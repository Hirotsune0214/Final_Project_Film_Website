import axios from "axios";
import React, { useEffect, useState } from "react";

interface MoviesData {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: "string";
}

const Videos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/series_id/videos?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setVideos(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return <h2>VIodes</h2>;
};

export default Videos;
