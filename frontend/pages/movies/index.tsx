import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadMore_movies from "@/components/LoadMore_movies";
import MainImageMovies from "@/components/MainImageMovies";
import Movies from "@/components/Movies";
import React from "react";

const movies = () => {
  return (
    <div>
      <Header />
      <MainImageMovies />
      <Movies />
      <LoadMore_movies />
      <Footer />
    </div>
  );
};

export default movies;
