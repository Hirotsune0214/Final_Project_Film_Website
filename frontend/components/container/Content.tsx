import React from "react";

import PopularMSeries from "./PopularSeries";
import PopularMovies from "./PopularMovies";
import TopRatedMovies from "./TopRatedMovies";
import TopRatedSeries from "./TopRatedSeries";
import { useRouter } from "next/router";

const Content = () => {
  return (
    <>
      <div style={{ padding: "45px", backgroundColor: "#F5F5F5" }}>
        <PopularMovies />
        <PopularMSeries />
        <TopRatedMovies />
        <TopRatedSeries />
      </div>
    </>
  );
};

export default Content;
