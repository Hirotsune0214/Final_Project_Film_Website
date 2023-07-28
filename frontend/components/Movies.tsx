import React, { useEffect, useState } from "react";
import axios from "axios";

// interfaceを使い回して良いのか
interface SeriesData {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: "string";
}

const Movies = () => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [dramas, setDramas] = useState<SeriesData[]>([]);

  const fetchDramas = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setDramas(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDramas();
  }, []);

  console.log(dramas);

  return (
    <div style={{ display: "block", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Movies</h1>

        <div>
          <button>POPULAR</button>
          <button>TOP RATED</button>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "10px",
          cursor: "pointer",
        }}
      >
        {dramas.map((drama: SeriesData) => (
          <img
            src={`${URL}${drama.poster_path}`}
            alt={drama.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
