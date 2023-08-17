import React, { useEffect, useState } from "react";
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

    try {
      await axios.post("http://localhost:8080/api/posts", {
        userId: user.username,
        desc: inputText,
        movie: id,
      });

      setInputText("");

      // 最新のデータをgetしてresponseに格納する
      const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // ページ読み込み時にレビューを取得して表示
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts/${id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [id]); // id が変化したときに実行

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
            <Button type="submit" sx={postButton}></Button>
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
