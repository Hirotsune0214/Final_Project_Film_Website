import Layout from "@/components/Layout";
import Search from "@/components/Search";
import { Box } from "@mui/material";

import axios from "axios";

import Head from "next/head";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

/******************************************************************************************/

export const SearchCss = {
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
    boxShadow: "10px -9px 20px -2px rgba(119,119,119,0.6)",
    borderColor: "rgba(242, 30, 30, 0.8)",
  },
  "& .image": {
    transition: "transform 0.2",
    border: "5px solid transparent",
  },
  "& .text": {
    position: "absolute",
    width: {
      lg: "101%",
      xl: "100.5%",
    },
    height: {
      md: "98%",
      lg: "98.5%",
      xl: "99%",
    },
    top: 0,
    left: -0.8,
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

const search = () => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("movie");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${category}?query=${searchValue}&api_key=${apikey}`
      );
      setSearchResults(response.data.results);

      // isLoadingで切り替え
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [searchValue, category]);

  const fetchPage = async () => {
    try {
      toast.loading("Fetching new page");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${category}?query=${searchValue}&page=${currentPage}&api_key=${apikey}`
      );

      // TODO: 型定義について
      setSearchResults((prevPageLists) => [
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

  useEffect(() => {
    if (currentPage > 1) {
      fetchPage();
    }
  }, [currentPage]);

  const handleAddPages = () => {
    // 引数のprevPageは前の値を持っている
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    // isLoadingで切り替え
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <Toaster />
      <div>
        <Layout>
          <Search
            handleAddPages={handleAddPages}
            handleCategoryChange={handleCategoryChange}
            category={category}
            handleSearch={handleSearch}
            searchValue={searchValue}
            searchResults={searchResults}
            extractYearFromDate={extractYearFromDate}
          />
        </Layout>
      </div>
    </>
  );
};

export default search;
