import Dramas from "@/components/Dramas";
import Layout from "@/components/Layout";
import MainImageDramas from "@/components/MainImageDramas";
import axios from "axios";

import React, { useEffect, useState } from "react";

interface SeriesData {
  id: string;
  poster_path: string;
  name: string;
  original_title: string;
  first_air_date: string;
  vote_average: number;
  backdrop_path: "string";
}

const dramas = () => {
  const [dramas, setDramas] = useState<SeriesData[]>([]);
  const [movieLists, setMovieLists] = useState("popular");

  const fetchPopularDramas = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieLists}?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setDramas(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularDramas();
  }, [movieLists]);

  return (
    <div>
      <Layout>
        <MainImageDramas dramas={dramas} />
        <Dramas
          dramas={dramas}
          movieLists={movieLists}
          setMovieLists={setMovieLists}
          setDramas={setDramas}
        />
      </Layout>
    </div>
  );
};

export default dramas;
