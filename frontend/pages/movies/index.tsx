import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainImageMovies from "@/components/MainImageMovies";
import Movies from "@/components/Movies";
import axios from "axios";
import React, { useEffect, useState } from "react";

// TODO: リファクタリンで、type.tsに移動させる
interface MoviesData {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: "string";
}

const movies = () => {
  const [movies, setMovies] = useState<MoviesData[]>([]);
  const [movieLists, setMovieLists] = useState("popular");

  const fetchListsMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieLists}?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListsMovies();
  }, [movieLists]);

  return (
    <div>
      <Header />
      <MainImageMovies movies={movies}/>
      <Movies movies={movies} movieLists={movieLists} setMovieLists={ setMovieLists} />
      <Footer />
    </div>
  );
};

export default movies;
