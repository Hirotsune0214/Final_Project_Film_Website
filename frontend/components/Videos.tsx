import axios from "axios";
import React, { useEffect, useState } from "react";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=bb46848237eacc0a36827f6639b47ee3"
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

  return <div>VIDEOS</div>;
};

export default Videos;
