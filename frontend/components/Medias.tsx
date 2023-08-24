// import { Box } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// interface Medias {
//   poster_path: string;
//   title: string;
//   vote_average: number;
//   release_date: string;
// }

// const Medias = ({ id }: { id: string }) => {
//   const URL = "https://image.tmdb.org/t/p/w780";
//   const [personCasts, setPersonCasts] = useState([]);
//   const [ishover, setIshover] = useState(false);

//   const fetchMovieCredits = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=bb46848237eacc0a36827f6639b47ee3`
//       );

//       setPersonCasts(response.data.cast);
//       console.log(response.data.cast);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const boxSX = {
//     maxWidth: "500px",
//     margin: "0 auto",
//     position: "relative",
//     cursor: "pointer",
//     background: "cover",
//     "&:hover .text": {
//       opacity: 1,
//     },
//     "&:hover .img": {
//       transform: "scale(1.05) translateY(-10px)",
//       // rgbaにして、alphaを0.1にする
//       boxShadow: "8px -9px 20px -2px#777777",
//       transition: ".3s ease-in-out",
//       position: "relative",
//       zIndex: "2",
//       // transform: "scale(1.05) translateY(-10px)",
//       // transition: ".3s ease-in-out",
//       // position: "relative",
//       // zIndex: "2",
//       // border: "3.5px solid #9c9897",
//       borderColor: "rgba(11, 64, 188, 0.775)",
//     },
//     "& .img": {
//       width: "100%",
//       height: "100%",
//       transition: "transform 0.2",
//       border: "5px solid transparent",
//     },
//     "& .text": {
//       position: "absolute",
//       width: "95%",
//       height: "100%",
//       top: 0,
//       left: 0,
//       textAlign: "center",
//       color: "#fff",
//       background:
//         "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
//       transition: ".3s ease-in-out",
//       opacity: 0,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       transform: "scaleX(1.05)",
//       zIndex: "2",
//       marginLeft: "5px",
//     },
//   };

//   useEffect(() => {
//     fetchMovieCredits();
//   }, [id]);

//   const extractYearFromDate = (dateString: string): string => {
//     return dateString.substring(0, 4); // Extract the first 4 characters (the year)
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           marginTop: "20px",
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gridGap: "5px",
//           rowGap: "48px",
//           cursor: "pointer",
//         }}
//       >
//         {personCasts.map((personCast: Medias) => (
//           <Box
//             key={personCast.title}
//             onMouseEnter={() => {
//               setIshover(true);
//             }}
//             onMouseLeave={() => {
//               setIshover(false);
//             }}
//             sx={boxSX}
//           >
//             <img
//               className="img"
//               src={`${URL}${personCast.poster_path}`}
//               alt={personCast.title}
//               style={{
//                 width: "95%",
//                 height: "95%",
//                 objectFit: "cover",
//                 zIndex: "1",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//             />
//             <Box className="text">
//               <div>{personCast.vote_average}</div>
//               <div>{extractYearFromDate(personCast.release_date)}</div>
//               <div>{personCast.title}</div>
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </>
//   );
// };

// export default Medias;

import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Media {
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const Medias = ({ id }: { id: string }) => {
  const URL = "https://image.tmdb.org/t/p/w780";
  const [personCasts, setPersonCasts] = useState<Media[]>([]);
  const [visibleMovies, setVisibleMovies] = useState(8);
  const moviesToShow = 8;

  const fetchMovieCredits = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=bb46848237eacc0a36827f6639b47ee3`
      );

      setPersonCasts(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieCredits();
  }, [id]);

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };
  const boxSX = {
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
      height: "100%",
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

  return (
    <>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        MEDIAS
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "45%",
            borderBottom: "7px solid red",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        ></span>
      </h1>
      <Box
        sx={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "5px",
          rowGap: "48px",
          cursor: "pointer",
        }}
      >
        {personCasts.slice(0, visibleMovies).map((personCast: Media) => (
          <Box key={personCast.title} sx={boxSX}>
            <img
              className="img"
              src={`${URL}${personCast.poster_path}`}
              alt={personCast.title}
              style={{
                width: "95%",
                height: "95%",
                objectFit: "cover",
                zIndex: "1",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            />
            <Box className="text">
              <div>{personCast.vote_average}</div>
              <div>{extractYearFromDate(personCast.release_date)}</div>
              <div>{personCast.title}</div>
            </Box>
          </Box>
        ))}
      </Box>
      {visibleMovies < personCasts.length && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            sx={{
              color: "#FF0000",
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "20px",
              ":hover": {
                color: "white",
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
            onClick={() => setVisibleMovies(visibleMovies + moviesToShow)}
          >
            LOAD MORE
          </Button>
        </Box>
      )}
    </>
  );
};

export default Medias;
