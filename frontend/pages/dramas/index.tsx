import axios from "axios";

import Dramas from "@/components/Dramas";
import Layout from "@/components/Layout";
import MainImageDramas from "@/components/MainImageDramas";

import Head from "next/head";

import React, { useEffect, useState } from "react";

import { Drama } from "@/src/state/category";
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
    width: "99%",
    height: {
      md: "98.5%",
      lg: "98%",
      xl: "99.2%",
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
      xs: "95.1%",
      lg: "93%",
      xl: "92%",
    },
    height: {
      xs: "16.2vh",
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

const dramas = () => {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [dramaLists, setDramaLists] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchListsDramas = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${dramaLists}?api_key=${apikey}`
      );
      setDramas(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListsDramas();
  }, [dramaLists]);

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  const fetchNewPageDramas = async () => {
    try {
      toast.loading("Fetching new page");
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${dramaLists}?page=${currentPage}&api_key=${apikey}`
      );

      setDramas((prevPageLists) => [
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

  const handleAddDramasPages = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchNewPageDramas();
    }
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>TV series</title>
      </Head>
      <Toaster />
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "100%",
          },
          height: {
            xs: "80vh",
          },
        }}
      >
        <Layout>
          <MainImageDramas dramas={dramas} />
          <Dramas
            dramas={dramas}
            dramaLists={dramaLists}
            setDramaLists={setDramaLists}
            extractYearFromDate={extractYearFromDate}
            handleAddDramasPages={handleAddDramasPages}
          />
        </Layout>
      </Box>
    </>
  );
};

export default dramas;
