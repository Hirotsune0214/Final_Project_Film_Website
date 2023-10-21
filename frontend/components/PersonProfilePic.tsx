import { Category } from "@/src/state/category";
import { Box } from "@mui/material";

const PersonProfile = ({ personPic }: { personPic: Category | null }) => {
  console.log(personPic);
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

  return (
    <Box
      sx={{
        display: {
          md: "flex",
        },
        justifyContent: {
          md: "center",
        },
        alignItems: {
          md: "center",
        },
      }}
    >
      {personPic && (
        <Box
          sx={{
            backgroundImage: `url(${URL}${personPic.profile_path})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: { xs: "50vh", md: "50vh", lg: "60vh", xl: "55vh" },
            width: { xs: "350px", md: "360px", lg: "280px", xl: "250px" },
            marginTop: {
              xs: "35px",
              md: "10px",
              lg: "15px",
            },
          }}
        ></Box>
      )}
    </Box>
  );
};

export default PersonProfile;
