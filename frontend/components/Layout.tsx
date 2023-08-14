import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { userState } from "@/src/state/auth";
import { useRecoilState } from "recoil";

const Layout = ({ children }: any) => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
