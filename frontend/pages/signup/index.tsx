import React from "react";
import Signup from "@/components/Signup";
import WithAuth from "@/components/WithAuth";

const signup = () => {
  return (
    <WithAuth>
      <Signup />
    </WithAuth>
  );
};

export default signup;
