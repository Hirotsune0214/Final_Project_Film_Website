import { Box } from "@mui/material";

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
        <h2>
          {rightSideDetail.original_title}
          {extractYearFromDate(rightSideDetail.release_date)}
        </h2>
        <Box sx={{ marginTop: "40px" }}>
          <div>{rightSideDetail.vote_average.toFixed(1)}</div>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <span>{rightSideDetail.overview}</span>
        </Box>
      </div>
    </Box>
  );
};

export default RightSideDetailMain;
