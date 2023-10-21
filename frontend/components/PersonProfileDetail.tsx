import { Box } from "@mui/material";

import { PersonDetail } from "@/src/state/category";

const PersonProfileDetail = ({
  personDetail,
}: {
  personDetail: PersonDetail | null;
}) => {
  return (
    <Box
      sx={{
        padding: "16px 32px",
      }}
    >
      {personDetail && (
        <Box
        // sx={{
        //   display: {
        //     md: "flex",
        //   },
        //   justifyContent: {
        //     md: "center",
        //   },
        //   alignItems: {
        //     md: "center",
        //   },
        // }}
        >
          <Box
            component="h1"
            sx={{
              fontSize: { xs: "30px", md: "26px", lg: "32px", xl: "27px" },
              display: {
                xs: "flex",
                md: "flex",
              },
              justifyContent: {
                xs: "center",
                md: "center",
              },
              alignItems: {
                xs: "center",
                md: "center",
              },
            }}
          >
            {personDetail.name}
            {personDetail.birthday
              ? ` (${personDetail.birthday.slice(0, 4)}) `
              : "(No data)"}
          </Box>

          <Box
            sx={{
              marginTop: {
                lg: "40px",
                xl: "30px",
              },
              fontSize: { xs: "16px", md: "16px", lg: "18px", xl: "20px" },
              letterSpacing: "1.1px",
              fontWeight: {
                xs: "lighter",
                md: "lighter",
                lg: "lighter",
                xl: "lighter",
              },
              lineHeight: {
                xs: "1.25",
                md: "1.5",
                lg: "1.4",
                xl: "1.3",
              },
            }}
          >
            <span>
              {personDetail.biography ? (
                `${personDetail.biography}`
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    left: "40px",
                    marginTop: "-70px",
                    width: "220px",
                    height: "40vh",
                    borderRadius: "4px",
                    backgroundColor: "darkgrey",
                  }}
                ></Box>
              )}
            </span>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PersonProfileDetail;
