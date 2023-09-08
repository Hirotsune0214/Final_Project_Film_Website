import Favorites from "@/components/Favorites";
import Layout from "@/components/Layout";
import { userState } from "@/src/state/auth";
import { Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const favoriteCss = {
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
    // transform: "scale(1.05) translateY(-10px)",
    // transition: ".3s ease-in-out",
    // position: "relative",
    // zIndex: "2",
    // border: "3.5px solid #9c9897",
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
    height: "100.5%",
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

const favorites = () => {
  const [user, setUser] = useRecoilState(userState);
  const [favorites, setFavorites] = useState([]);
  const userId = user.username;

  const fetchFavorites = async () => {
    try {
      const responseFav = await axios.get(
        `http://localhost:8080/api/favorites/user/${userId}`
      );
      setFavorites(responseFav.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  const handleDelete = () => {
    console.log("test");
  };

  return (
    <>
      <div>
        <Layout>
          <Box
            sx={{ padding: "16px", backgroundColor: "#F5F5F5", height: "100%" }}
          >
            <Favorites
              favorites={favorites}
              extractYearFromDate={extractYearFromDate}
              handleDelete={handleDelete}
            />
          </Box>
        </Layout>
      </div>
    </>
  );
};

export default favorites;
