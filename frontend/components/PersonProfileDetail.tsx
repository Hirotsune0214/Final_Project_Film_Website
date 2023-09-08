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
            {personDetail.name}
            {personDetail.birthday
              ? `(${personDetail.birthday.slice(0, 4)})`
              : "(No data)"}
          </h1>

          <Box
            sx={{
              marginTop: "40px",
              fontSize: "20px",
              letterSpacing: "2",
              lineHeight: "1.3",
            }}
          >
            <span>
              {personDetail.biography ? (
                `${personDetail.biography}`
              ) : (
                <div
                  style={{
                    position: "absolute",
                    left: "40px",
                    marginTop: "-70px",
                    width: "220px",
                    height: "40vh",
                    borderRadius: "4px",
                    backgroundColor: "darkgrey",
                  }}
                ></div>
              )}
            </span>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default PersonProfileDetail;
