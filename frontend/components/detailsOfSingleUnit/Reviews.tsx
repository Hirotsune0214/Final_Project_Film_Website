import React, { useEffect, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Avatar, Box, Button, TextField } from "@mui/material";
import ReviewArea from "./ReviewArea";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/src/state/auth";

interface Review {
  userId: string;
  desc: string;
  movie: number;
}

const Reviews = ({ id }: { id: string }) => {
  const [inputText, setInputText] = useState<string>("");
  const [user, setUser] = useRecoilState(userState);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<String>("");

  const currentUser = user.username;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim() === "") {
      setError("Review text cannot be empty");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/posts", {
        userId: user.username,
        desc: inputText,
        movie: id,
      });

      setInputText("");
      setError("");
      await fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
      const sortedReviews = response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setReviews(sortedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchReviews();
      console.log(reviews);
    })();
  }, [id]);

  const postButton = {
    display: "none",
  };

  // const reviewInput = {
  //   color: "gray",
  //   margin: "20px",
  //   padding: "20px",
  //   background: "transparent",
  //   border: "none",
  //   outline: "none",
  //   fontSize: "large",
  //   "&:hover": {
  //     border: "black",
  //   },
  // };

  return (
    <>
      <div>
        <ReviewArea
          reviews={reviews}
          id={id}
          setReviews={setReviews}
          currentUser={currentUser}
        />

        <hr />

        {user.username ? (
          <Box>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Avatar />
              <p style={{ fontSize: "25px" }}>{user.username}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{
                  width: "70%",
                  margin: "0 0 20px 54px",
                  padding: "10px 0",
                  background: "transparent",
                }}
                type="text"
                placeholder="Write your review"
                value={inputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputText(e.target.value);
                  setError("");
                }}
                error={!!error}
                helperText={error}
                // エラーメッセージを編集するもの
                FormHelperTextProps={{
                  sx: {
                    fontSize: "16px",
                    marginTop: "10px",
                  },
                }}
                InputProps={{
                  sx: {
                    fontSize: "16px",
                    height: "15vh",
                  },
                }}
              />
              <Button type="submit" sx={postButton}></Button>
              <Button type="submit" sx={postButton}>
                <SendOutlinedIcon />
                POST
              </Button>
            </form>
          </Box>
        ) : null}
      </div>
    </>
  );
};

export default Reviews;
