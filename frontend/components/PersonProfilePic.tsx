import { Category } from "@/src/state/category";

const PersonProfile = ({ personPic }: { personPic: Category | null }) => {
  console.log(personPic);
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

  return (
    <div>
      {personPic && (
        <div
          style={{
            backgroundImage: `url(${URL}${personPic.profile_path})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "55vh",
            width: "230px",
          }}
        ></div>
      )}
    </div>
  );
};

export default PersonProfile;
