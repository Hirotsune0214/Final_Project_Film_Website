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

const ReviewArea = ({ reviews }: any) => {
  return (
    <>
      {reviews.map((review: any, index: number) => (
        <div key={index} style={review}>
          <Avatar />
          <div style={reviewInfo}>
            <h4>
              {review.userId}
              <span style={reviewTimestamp}>{review.timestamp}</span>
            </h4>
            <p>{review.desc}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewArea;
