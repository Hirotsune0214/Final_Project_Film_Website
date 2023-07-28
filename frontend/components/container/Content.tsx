import React from "react";

import PopularMSeries from "./PopularSeries";
import PopularMovies from "./PopularMovies";
import TopRatedMovies from "./TopRatedMovies";
import TopRatedSeries from "./TopRatedSeries";

const Content = () => {
  return (
    <>
      <div style={{ padding: "16px" }}>
        <PopularMovies />
        <PopularMSeries />
        <TopRatedMovies />
        <TopRatedSeries />
      </div>
    </>
  );
};

export default Content;
