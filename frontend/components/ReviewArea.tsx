import { Avatar } from "@mui/material";
import React from "react";

const review = {
  display: "flex",
  alignItems: "center",
  padding: "15px",
  marginBottom: "10px",
};

const reviewInfo = {
  padding: "20px 20px 20px 10px",
};

const reviewTimestamp = {
  color: "#7b7c85",
  marginLeft: "20px",
};

const ReviewArea = () => {
  return (
    <div style={review}>
      <Avatar />
      <div style={reviewInfo}>
        <h4>
          Hiro
          <span style={reviewTimestamp}>2023/07/25</span>
        </h4>

        <p>メッセージ本文</p>
      </div>
    </div>
  );
};

export default ReviewArea;