import { Avatar, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";

const review = {
  display: "flex",
  alignItems: "center",
  padding: "15px",
  marginBottom: "10px",
};

const reviewInfo = {
  padding: "5px 0px 20px 0px",
};

const reviewTimestamp = {
  color: "#7b7c85",
  marginLeft: "20px",
};

const ReviewArea = ({
  id,
  reviews,
  setReviews,
}: {
  id: string;
  reviews: any;
  setReviews: any;
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`, {});
      console.log("@@@@@@@@@@@@@@@@");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ padding: "0 30px" }}>
        <h1
          style={{
            display: "inline-block",
            position: "relative",
          }}
        >
          Reviews ({reviews.length})
          <span
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "0",
              width: "71%",
              borderBottom: "7px solid red",
              borderRadius: "20px",
            }}
          ></span>
        </h1>
        <Box sx={{ marginTop: "15px" }}>
          {reviews.map((review: any, index: number) => (
            <div key={index} style={review}>
              <Avatar />
              <div style={reviewInfo}>
                <h4>
                  {review.userId}
                  <span style={reviewTimestamp}>
                    {format(review.createdAt)}
                  </span>
                </h4>
                <p>{review.desc}</p>
                <DeleteOutlineIcon
                  sx={{ color: "red", fontSize: "30px" }}
                  onClick={handleDelete}
                />
              </div>
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ReviewArea;
