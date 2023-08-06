import React from "react";
import Login from "@/components/Login";
import WithAuth from "@/components/WithAuth";

const login = () => {
  return (
    <WithAuth>
      <Login />
    </WithAuth>
  );
};

export default login;
