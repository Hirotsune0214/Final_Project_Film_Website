import React, { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Button } from "@mui/material";
import ReviewArea from "./ReviewArea";
import axios from "axios";

const Reviews = ({ user }) => {
  const [inputText, setInputText] = useState<string>("");

  /*
  const sendReview = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // メッセージ情報をmongoに格納する必要がある
    try {
      await axios.post("/api/posts/", { text: inputText });
      console.log("レビューが正常に送信されました");
    } catch (error) {
      console.error(error);
    }
  };
  */ const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/posts", {
        content: inputText,
      });
      console.log("aaaaa");

      setInputText("");
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
        <ReviewArea />
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
            {/* 
          <Button
            type="submit"
            sx={postButton}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendReview(e)
            }
             */}
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
