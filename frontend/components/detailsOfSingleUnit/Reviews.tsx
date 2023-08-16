import React, { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Button } from "@mui/material";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(inputText);
    // console.log(user.username);

    // const res = await axios.get(api)

    try {
      await axios.post("http://localhost:8080/api/posts", {
        userId: user.username,
        desc: inputText,
        movie: id,
      });

      console.log({ id });

      setReviews([...reviews]);

      setInputText("");

      // getする
      // await axios.get("http://localhost:8080/api/posts/reviews", {});
    } catch (error) {
      console.error(error);
    }
  };

  const postButton = {
    display: "none",
  };

  // TODO: 修正の必要性(+)
  const reviewInput = {
    color: "gray",
    margin: "20px",
    padding: "20px",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "large",
    "&:hover": {
      border: "black",
    },
  };

  return (
    <>
      <div>
        <ReviewArea reviews={reviews} />

        {user.username ? (
          <form onSubmit={handleSubmit}>
            <input
              style={reviewInput}
              type="text"
              placeholder="Write your review"
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
            />

            {/* 空文字の場合にエラーを表示させる */}
            <Button
              type="submit"
              sx={postButton}
              // onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              //   handleSubmit(e)
              // }
            ></Button>
            <Button type="submit" sx={postButton}>
              <SendOutlinedIcon />
              POST
            </Button>
          </form>
        ) : null}
      </div>
    </>
  );
};

export default Reviews;
