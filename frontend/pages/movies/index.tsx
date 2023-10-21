import axios from "axios";

import Layout from "@/components/Layout";
import MainImageMovies from "@/components/MainImageMovies";
import Movies from "@/components/Movies";

import { Movie } from "@/src/state/category";

import Head from "next/head";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Box } from "@mui/material";

export const MovieDramaLaptopMonitorCss = {
  maxWidth: "500px",
  margin: "0 auto",
  position: "relative",
  cursor: "pointer",
  background: "cover",
  "&:hover .text": {
    opacity: 1,
  },
  "&:hover .image": {
    transform: "scale(1.05) translateY(-10px)",
    transition: ".3s ease-in-out",
    position: "relative",
    zIndex: "2",
    boxShadow: "8px -9px 20px -2px rgba(119,119,119,0.6)",
    borderColor: "rgba(242, 30, 30, 0.8)",
  },
  "& .image": {
    transition: "transform 0.2",
    border: "5px solid transparent",
  },
  "& .text": {
    position: "absolute",
    width: {
      md: "98.5%",
      lg: "100%",
      xl: "99.5%",
    },
    height: {
      md: "98.5%",
      lg: "98%",
      xl: "99%",
    },
    top: 0,
    left: 0,
    textAlign: "center",
    color: "#fff",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
    transition: ".3s ease-in-out",
    opacity: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: "scaleX(1.05)",
    zIndex: "2",
    marginLeft: "5px",
  },
};

export const MovieDramaMobileTabletCss = {
  maxWidth: "500px",
  margin: "0 auto",
  position: "relative",
  cursor: "pointer",
  "& .image": {
    transition: "transform 0.2s",
    border: {
      md: "none",
      lg: "5px solid transparent",
      xl: "5px solid transparent",
    },
  },
  "& .text": {
    position: "absolute",
    width: {
      xs: "95.7%",
      md: "91.5%",
      lg: "93%",
      xl: "92%",
    },
    height: {
      xs: "15.5vh",
      md: "26.3vh",
      lg: "57.5vh",
      xl: "48.3vh",
    },
    top: "30px",
    left: -7.5,
    textAlign: "center",
    color: "#fff",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(1.05)",
    zIndex: "2",
    marginTop: "65.1px",
    marginLeft: "11.5px",
    fontSize: "20px",
    borderRadius: "10px",
  },
};

/******************************************************************************************/

const movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieLists, setMovieLists] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchListsMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieLists}?api_key=${apikey}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  /*
    TODO: 確認する
    どのuseEffectに入れたら良いかが難しい
    if (window.performance.navigation.type === 1) {
      window.scrollTo({ top: 0 });
    }
    window.performance.navigation.type === 1は、リロード時の意味

    loadmoreのボタン押下時の表示が滑らかではない
      useEffect(() => {
    fetchListsMovies();
    if (currentPage > 1) {
      fetchNewPageMovies();
    }
  }, [movieLists, currentPage]);
  */

  useEffect(() => {
    fetchListsMovies();
  }, [movieLists]);

  const fetchNewPageMovies = async () => {
    try {
      toast.loading("Fetching new page");
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieLists}?page=${currentPage}&api_key=bb46848237eacc0a36827f6639b47ee3`
      );

      setMovies((prevPageLists) => [
        ...prevPageLists,
        ...response.data.results,
      ]);
      toast.dismiss();
      toast.success("New page fetched successfully", {
        duration: 1500, // 1.5秒間表示後に自動的に非表示にする
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMoviesPages = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchNewPageMovies();
    }
  }, [currentPage]);

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Toaster />
      <Box>
        <Layout>
          <Box>
            <MainImageMovies movies={movies} />
            <Movies
              movies={movies}
              movieLists={movieLists}
              setMovieLists={setMovieLists}
              handleAddMoviesPages={handleAddMoviesPages}
              extractYearFromDate={extractYearFromDate}
            />
          </Box>
        </Layout>
      </Box>
    </>
  );
};

export default movies;
