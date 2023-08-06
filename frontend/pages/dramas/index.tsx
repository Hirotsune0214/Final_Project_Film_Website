import Dramas from "@/components/Dramas";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainImageDramas from "@/components/MainImageDramas";

import React from "react";

const dramas = () => {
  return (
    <div>
      <Header />
      <MainImageDramas />
      <Dramas />
      <Footer />
    </div>
  );
};

export default dramas;
