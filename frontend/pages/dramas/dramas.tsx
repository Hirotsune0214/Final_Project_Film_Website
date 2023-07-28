import Dramas from "@/components/Dramas";
import Header from "@/components/Header";
import MainImageDramas from "@/components/MainImageDramas";

import React from "react";

const dramas = () => {
  return (
    <div>
      <Header />
      <MainImageDramas />
      <Dramas />
    </div>
  );
};

export default dramas;
