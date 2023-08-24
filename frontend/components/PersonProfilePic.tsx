import axios from "axios";
import React, { useEffect, useState } from "react";

interface PersonPic {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  profile_path: string;
}

const PersonProfile = ({ id }: { id: string }) => {
  const URL = "https://image.tmdb.org/t/p/original";
  const [personPic, setPersonPic] = useState<PersonPic | null>(null);

  const fetchPersonInfo = async () => {
    console.log(id);

    try {
      const response = await axios.get(
        // `https://api.themoviedb.org/3/search/person?id=${id}&api_key=bb46848237eacc0a36827f6639b47ee3&include_adult=false&language=en-US&page=1`
        `https://api.themoviedb.org/3/person/${id}?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setPersonPic(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersonInfo();
  }, [id]);

  return (
    <div>
      {personPic && (
        <div
          style={{
            backgroundImage: `url(${URL}${personPic.profile_path})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "55vh",
            width: "230px",
          }}
        ></div>
      )}
    </div>
  );
};

export default PersonProfile;
