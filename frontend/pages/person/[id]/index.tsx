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

export const personCss = {
  maxWidth: "500px",
  margin: "0 auto",
  position: "relative",
  cursor: "pointer",
  background: "cover",
  "&:hover .text": {
    opacity: 1,
  },
  "&:hover .img": {
    transform: "scale(1.05) translateY(-10px)",
    // rgbaにして、alphaを0.1にする
    boxShadow: "8px -9px 20px -2px#777777",
    transition: ".3s ease-in-out",
    position: "relative",
    zIndex: "2",

    borderColor: "rgba(11, 64, 188, 0.775)",
  },
  "& .img": {
    width: "100%",
    height: "100%",
    transition: "transform 0.2",
    border: "5px solid transparent",
  },
  "& .text": {
    position: "absolute",
    width: "95%",
    height: "98%",
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
      <div>
        <Layout>
          <Box sx={{ padding: "16px", display: "flex" }}>
            <PersonProfilePic personPic={personPic} />
            <PersonProfileDetail personDetail={personDetail} />
          </Box>
          <Box sx={{ padding: "16px" }}>
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
