import { Box, Typography } from "@mui/material";

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
              md: "30px",
              lg: "35px",
              xl: "60px",
            },
            fontWeight: {
              lg: "bold",
              xl: "550",
            },
            display: "flex",
            width: "465px",
          }}
        >
          {rightSideDetail.original_title}
          <Box
            sx={{
              marginLeft: {
                lg: "10px",
              },
            }}
          >
            {extractYearFromDate(rightSideDetail.release_date)}
          </Box>
        </Typography>
        <Box
          sx={{
            marginTop: "40px",
            fontSize: {
              md: "17px",
              lg: "20px",
              xl: "20px",
            },
            fontWeight: "500",
          }}
        >
          <div>{rightSideDetail.vote_average.toFixed(1)}</div>
        </Box>
        <Box
          sx={{
            maxWidth: {
              md: "800px",
              lg: "700px",
              xl: "1000px",
            },
            marginTop: {
              md: "30px",
              lg: "40px",
              xl: "40px",
            },
            fontSize: {
              md: "16px",
              lg: "17px",
              xl: "19px",
            },
            letterSpacing: "2",
            lineHeight: "1.3",
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
