import { Box } from "@mui/material";

import { Drama } from "@/src/state/category";

type Props = {
  rightSideDetail: Drama | null;
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
      <div>
        <h1 style={{ fontSize: "40px", display: "flex", width: "465px" }}>
          {rightSideDetail.name}
          <div style={{ marginLeft: "20px" }}>
            {extractYearFromDate(rightSideDetail.first_air_date)}
          </div>
        </h1>
        <Box sx={{ marginTop: "40px", fontSize: "20px", fontWeight: "500" }}>
          <div>{rightSideDetail.vote_average.toFixed(1)}</div>
        </Box>
        <Box
          sx={{
            maxWidth: {
              lg: "700px",
            },
            marginTop: "40px",
            fontSize: {
              lg: "20px",
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
      </div>
    </Box>
  );
};

export default RightSideDetailMain;
