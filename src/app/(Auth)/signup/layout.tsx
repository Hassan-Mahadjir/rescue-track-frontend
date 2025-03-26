import HeaderWrapper from "@/components/signup/HeaderWrapper";
import { UserFormContextProider } from "@/components/UserFormContextProvider";
import React from "react";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-t from-main to-second-green min-h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white w-3/4 rounded-3xl p-5 py-10 my-10">
        <HeaderWrapper />
        <UserFormContextProider>{children}</UserFormContextProider>
      </div>
    </div>
  );
};

export default SignupLayout;
