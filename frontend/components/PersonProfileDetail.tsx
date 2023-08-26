import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface PersonPic {
  id: string;
  name: string;
  biography: string;
  birthday: string;
}

const PersonProfileDetail = ({ id }: { id: string }) => {
  const URL = "https://image.tmdb.org/t/p/original";
  const [personDetail, setPersonDetail] = useState<PersonPic | null>(null);

  const fetchPersonInfo = async () => {
    console.log(id);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setPersonDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersonInfo();
  }, [id]);

  return (
    <Box sx={{ padding: "16px 32px" }}>
      {personDetail && (
        <div>
          <h1 style={{ fontSize: "32px", gap: "10" }}>
            {personDetail.name} ({personDetail.birthday.slice(0, 4)})
          </h1>

          <Box
            sx={{
              marginTop: "40px",
              fontSize: "20px",
              letterSpacing: "2",
              lineHeight: "1.3",
            }}
          >
            <span>{personDetail.biography}</span>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default PersonProfileDetail;
