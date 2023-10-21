import BackDrops from "@/components/detailsOfSingleUnit/BackDrops";
import Posters from "@/components/detailsOfSingleUnit/Posters";
import Reviews from "@/components/detailsOfSingleUnit/Reviews";
import React, { useEffect, useState } from "react";
import Videos from "@/components/detailsOfSingleUnit/Videos";
import Recommend from "@/components/Recommend";
import { useRouter } from "next/router";

import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import { useRecoilState } from "recoil";
import { userState } from "@/src/state/auth";
import axios from "axios";
import PersonProfilePic from "@/components/PersonProfilePic";
import PersonProfileDetail from "@/components/PersonProfileDetail";
import Medias from "@/components/Medias";
import { Category, PersonDetail } from "@/src/state/category";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export const personLaptopMonitorCss = {
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
    // rgbaにして、alphaを0.1にする
    boxShadow: "8px -9px 20px -2px#777777",
    transition: ".3s ease-in-out",
    position: "relative",
    zIndex: "2",
    borderColor: "rgba(242, 30, 30, 0.8)",
  },
  "& .image": {
    transition: "transform 0.2",
    border: "6px solid transparent",
  },
  "& .text": {
    position: "absolute",
    width: {
      lg: "100.5%",
    },
    height: {
      md: "65vh",
      lg: "98%",
      xl: "99.5%",
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

export const personMobileTabletCss = {
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
      xs: "95%",
      md: "95.5%",
      lg: "93%",
      xl: "92%",
    },
    height: {
      xs: "15.5vh",
      md: "25.5vh",
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

const single_unit = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const [user, setUser] = useRecoilState(userState);
  const [personCasts, setPersonCasts] = useState<Recommend[]>([]);
  const [personPic, setPersonPic] = useState<Category | null>(null);
  const [personDetail, setPersonDetail] = useState<PersonDetail | null>(null);

  const fetchMovieCredits = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apikey}`
      );

      // 映画を取得している
      setPersonCasts(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPersonInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${apikey}`
      );
      setPersonPic(response.data);
      setPersonDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieCredits();
    fetchPersonInfo();
  }, [id]);

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  return (
    <>
      <Head>
        <title>{personPic?.name}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <div>
        <Layout>
          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              padding: { xs: "8px", md: "15px", lg: "20px", xl: "30px 100px" },
              marginTop: {
                xs: "25px",
                lg: "60px",
              },
              position: "relative",
              top: {
                lg: "0rem",
              },
            }}
          >
            <Box
              sx={{
                display: {
                  md: "block",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            >
              <PersonProfilePic personPic={personPic} />
              <PersonProfileDetail personDetail={personDetail} />
            </Box>
            <Medias
              personCasts={personCasts}
              extractYearFromDate={extractYearFromDate}
            />
          </Box>
        </Layout>
      </div>
    </>
  );
};

export default single_unit;
