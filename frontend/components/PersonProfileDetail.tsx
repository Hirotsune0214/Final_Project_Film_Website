import { Box } from "@mui/material";

import { PersonDetail } from "@/src/state/category";

const PersonProfileDetail = ({
  personDetail,
}: {
  personDetail: PersonDetail | null;
}) => {
  return (
    <Box sx={{ padding: "16px 32px" }}>
      {personDetail && (
        <div>
          <h1 style={{ fontSize: "32px", gap: "10" }}>
            {personDetail.name} ({personDetail.birthday.slice(0, 4)})
          </h1>

          <Box
            sx={{
              marginTop: "40px",
              fontSize: "20px",
              letterSpacing: "2",
              lineHeight: "1.3",
            }}
          >
            <span>{personDetail.biography}</span>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default PersonProfileDetail;
