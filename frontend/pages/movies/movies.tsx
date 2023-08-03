import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainImageMovies from "@/components/MainImageMovies";
import Movies from "@/components/Movies";
import React from "react";

const movies = () => {
  return (
    <div>
      <Header />
      <MainImageMovies />
      <Movies />
      <Footer />
    </div>
  );
};

export default movies;
