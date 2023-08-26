import { Box, Typography } from "@mui/material";

const RightSideDetailMain = ({ rightSideDetail }: { rightSideDetail: any }) => {
  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  if (!rightSideDetail) {
    return null; // ロード中やエラー時に null を返すなどの適切な表示を行う
  }

  return (
    <Box>
      <div>
        <h1 style={{ fontSize: "40px" }}>
          {rightSideDetail.original_title}
          {extractYearFromDate(rightSideDetail.release_date)}
        </h1>
        <Box sx={{ marginTop: "40px", fontSize: "20px", fontWeight: "500" }}>
          <div>{rightSideDetail.vote_average.toFixed(1)}</div>
        </Box>
        <Box
          sx={{
            width: "740px",
            marginTop: "40px",
            fontSize: "20px",
            letterSpacing: "2",
            lineHeight: "1.3",
            color: "#201F1D",
            display: "flex",
            wordBreak: "break-word",
          }}
        >
          <span>{rightSideDetail.overview}</span>
        </Box>
      </div>
    </Box>
  );
};

export default RightSideDetailMain;
