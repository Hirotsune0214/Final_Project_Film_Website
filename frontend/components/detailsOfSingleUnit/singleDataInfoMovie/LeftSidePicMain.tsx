import React from "react";

import { Movie } from "@/src/state/category";

const LeftSidePicMain = ({ leftPic }: { leftPic: Movie | null }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_ORIGINAL;

  if (!leftPic) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${URL}${leftPic.poster_path})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "90vh",
          width: "500px",
          marginRight: "32px",
        }}
      ></div>
    </div>
  );
};

export default LeftSidePicMain;
