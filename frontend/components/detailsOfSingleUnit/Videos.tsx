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

  return (
    <div>
      {videos.map((video: MoviesData) => (
        <div key={video.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${video.poster_path}`}
            alt={video.title}
            style={{ width: "200px", height: "300px", objectFit: "cover" }}
          />
          <h2>{video.title}</h2>
          <p>Release Date: {video.release_date}</p>
          <p>Vote Average: {video.vote_average}</p>
        </div>
      ))}
    </div>
  );
};

export default Videos;
