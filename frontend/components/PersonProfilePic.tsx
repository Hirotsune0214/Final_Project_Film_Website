import { Category } from "@/src/state/category";
import { Box } from "@mui/material";

const PersonProfile = ({ personPic }: { personPic: Category | null }) => {
  console.log(personPic);
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

  return (
    <div>
      {personPic && (
        <Box
          sx={{
            backgroundImage: `url(${URL}${personPic.profile_path})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: { md: "80vh", lg: "60vh", xl: "55vh" },
            width: { md: "360px", lg: "280px", xl: "250px" },
            marginTop: {
              lg: "15px",
              // xl: "30px",
            },
          }}
        ></Box>
      )}
    </div>
  );
};

export default PersonProfile;
