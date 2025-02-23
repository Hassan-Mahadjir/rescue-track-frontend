import StepHeader from "@/components/Step-header";
import StepNavigation from "@/components/Step-navigation";
import { UserFormContextProider } from "@/components/UserFormContextProvider";
import React from "react";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-t from-main to-second-green h-screen flex items-center justify-center">
      \{" "}
      <div className="flex flex-col bg-white w-3/4 rounded-3xl p-5 py-10">
        <StepHeader />
        <StepNavigation />
        <UserFormContextProider>{children}</UserFormContextProider>
      </div>
    </div>
  );
};

export default SignupLayout;
