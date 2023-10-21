import { Box, CircularProgress, Typography } from "@mui/material";

import { Movie } from "@/src/state/category";

type Props = {
  rightSideDetail: Movie | null;
  extractYearFromDate: (dateString: string) => string;
};

const RightSideDetailMain = ({
  rightSideDetail,
  extractYearFromDate,
}: Props) => {
  if (!rightSideDetail) {
    return null;
  }

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: "30px",
              md: "30px",
              lg: "35px",
              xl: "60px",
            },
            fontWeight: {
              lg: "bold",
              xl: "550",
            },
            // display: "flex",
            width: {
              xs: "220px",
              md: "465px",
              lg: "465px",
              xl: "465px",
            },
            marginTop: {
              xs: "15px",
            },
            overflow: "hidden",
            marginBottom: {
              md: "10px",
            },
            letterSpacing: "0.02000em",
            // marginTop: "32px",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
            display: {
              xs: "-webkit-box",
              md: "-webkit-box",
              lg: "flex",
              xl: "flex",
            },
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textAlign: "left",
          }}
        >
          {rightSideDetail.original_title}
          <Box
            sx={{
              marginLeft: {
                md: "10px",
                lg: "10px",
              },
            }}
          >
            {extractYearFromDate(rightSideDetail.release_date)}
          </Box>
        </Typography>

        <Box
          sx={{
            marginTop: {
              xs: "20px",
              md: "20px",
              lg: "40px",
              xl: "40px",
            },
            fontSize: {
              md: "17px",
              lg: "20px",
              xl: "20px",
            },
            fontWeight: "500",
          }}
        >
          <CircularProgress
            variant="determinate"
            color="success"
            value={rightSideDetail.vote_average * 10}
            style={{ width: "40px" }}
          />
          <Box
            sx={{
              position: "absolute",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              width: "40px",
              height: "40px",
              color: "black",
              fontSize: {
                md: "17px",
                lg: "15px",
                xl: "14px",
              },
              fontWeight: {
                md: "300",
                lg: "300",
                xl: "300",
              },
              left: {
                xs: "29.5px",
                md: "30px",
                lg: "40.9%",
                xl: "44.7%",
              },
              top: {
                xs: "73.3%",
                md: "104.5%",
                lg: "44.3%",
                xl: "48%",
              },
              transform: {
                md: "translateY(-100%)",
                lg: "translateY(-100%)",
              },
            }}
          >
            {rightSideDetail.vote_average.toFixed(1)}
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: "350px",
              md: "680px",
            },
            maxWidth: {
              // md: "1200px",
              lg: "700px",
              xl: "1000px",
            },
            marginTop: {
              xs: "30px",
              md: "30px",
              lg: "40px",
              xl: "40px",
            },
            fontSize: {
              md: "18px",
              lg: "17px",
              xl: "19px",
            },
            letterSpacing: "2",
            lineHeight: {
              xs: "1.3",
              md: "1.4",
              lg: "1.3",
              xl: "1.3",
            },
            color: "#201F1D",
            display: "flex",
            wordBreak: "break-word",
          }}
        >
          <span>{rightSideDetail.overview}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default RightSideDetailMain;
