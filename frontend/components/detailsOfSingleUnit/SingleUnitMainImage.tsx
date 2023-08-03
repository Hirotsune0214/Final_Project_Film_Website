import axios from "axios";
import React, { useEffect, useState } from "react";

// interfaceを使い回して良いのか
interface Series {
  id: string;
  poster_path: string;
  backdrop_path: string;
}

const SingleUnitMainImage = () => {
  const URL = "https://image.tmdb.org/t/p/original"; // ポスター画像のベースURL

  const [dramas, setDramas] = useState<Series[]>([]);

  const fetchDramas = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setDramas(response.data.results);

      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDramas();
  }, []);

  return (
    <div>
      {dramas.length > 0 && (
        <div
          style={{
            backgroundImage: `url(${URL}${dramas[0].backdrop_path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        ></div>
      )}
    </div>
  );
};
export default SingleUnitMainImage;
