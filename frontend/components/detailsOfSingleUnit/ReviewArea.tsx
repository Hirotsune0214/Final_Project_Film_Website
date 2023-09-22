import { Avatar, Box, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import axios from "axios";
import { format } from "timeago.js";
import { useState } from "react";

const review = {
  display: "flex",
  alignItems: "center",
  padding: "15px",
  marginBottom: "10px",
};

const reviewTimestamp = {
  color: "#7b7c85",
  marginLeft: "20px",
  fontSize: "17px",
};

interface Review {
  id: string;
  reviews: any;
  setReviews: any;
  currentUser: string;
  category: string;
}

const ReviewArea = ({
  id,
  reviews,
  setReviews,
  currentUser,
  category,
}: Review) => {
  const [displayedReviewCount, setDisplayedReviewCount] = useState(4);

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${_id}`);
      setReviews(reviews.filter((review: any) => review._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (_id: string) => {
    try {
      await axios.put(`http://localhost:8080/api/posts/${_id}/like`, {
        currentUser,
      });
      const response = await axios.get(
        `http://localhost:8080/api/posts/${id}?category=${category}`
      );
      const sortedReviews = response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });

      setReviews(sortedReviews);
    } catch (error) {
      console.log(error);
    }
  };

  const visibleReviews = reviews.slice(0, displayedReviewCount); // 表示するレビューを制御

  const handleReviewPages = () => {
    if (displayedReviewCount + 4 <= reviews.length) {
      // もし表示されるレビュー数が現在のレビュー数より少ない場合、4件ずつ表示するように変更
      setDisplayedReviewCount(displayedReviewCount + 4);
    } else {
      setDisplayedReviewCount(reviews.length);
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "0 10px",
        }}
      >
        <Box
          sx={{ display: "inline-block", position: "relative", left: "4.5em" }}
        >
          <h1
            style={{
              margin: "30px 0 20px 0",
            }}
          >
            Reviews ({reviews.length})
            <span
              style={{
                position: "absolute",
                bottom: "8px",
                left: "0",
                width: "86%",
                borderBottom: "7px solid red",
                borderRadius: "20px",
              }}
            ></span>
          </h1>
        </Box>

        <Box sx={{ marginTop: "15px" }}>
          {visibleReviews.map((review: any, index: number) => (
            <div key={index} style={review}>
              <hr />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "21px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Avatar />
                  <div>{review.userId}</div>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginRight: "15px",
                  }}
                >
                  <DeleteOutlineIcon
                    sx={{ color: "red", fontSize: "30px" }}
                    onClick={() => handleDelete(review._id)}
                  />
                  <FavoriteBorderOutlinedIcon
                    sx={{ color: "red", fontSize: "30px" }}
                    onClick={() => handleLike(review._id)}
                  />
                  <div>{review.likes.length > 0 ? review.likes.length : 0}</div>

                  {/* 
                  testUserがいいね押します
                  testUser2がいいね押します同じのに
                  remove like -> tesUser
                  本来は1 -> 2 現状が 1 -> 
                  */}
                </Box>
              </Box>

              <div>
                <h4>
                  <span style={reviewTimestamp}>
                    {format(review.createdAt)}
                  </span>
                </h4>
                <p style={{ marginLeft: "10px", fontSize: "24px" }}>
                  {review.desc}
                </p>
              </div>
            </div>
          ))}
          {/* lengthが4以下の場合はfalseになるのでloadmoreは表示されない */}
          {reviews.length > displayedReviewCount && (
            <Button
              sx={{
                color: "#FF0000",
                fontSize: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "600px",
                ":hover": {
                  color: "white",
                  backgroundColor: "red",
                  opacity: 0.7,
                },
              }}
              onClick={() => handleReviewPages()}
            >
              LOAD MORE
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReviewArea;
