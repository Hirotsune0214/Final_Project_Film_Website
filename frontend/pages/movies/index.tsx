import Layout from "@/components/Layout";
import MainImageMovies from "@/components/MainImageMovies";
import Movies from "@/components/Movies";
import HomeMainImage from "@/src/state/main/homeMainImage";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const movies = () => {
  const [movies, setMovies] = useState<HomeMainImage[]>([]);
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
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <div>
        <Layout>
          <MainImageMovies movies={movies} />
          <Movies
            movies={movies}
            movieLists={movieLists}
            setMovieLists={setMovieLists}
            setMovies={setMovies}
          />
        </Layout>
      </div>
    </>
  );
};

export default movies;
