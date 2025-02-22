import StepNavigation from "@/components/Step-navigation";
import { UserFormContextProider } from "@/components/UserFormContextProvider";
import React from "react";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-t from-main to-second-green h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white w-3/4 rounded-3xl p-5 py-10">
        <div className="text-center mt-2">
          <h1 className=" text-2xl font-semibold mb-1">Create an account</h1>
          <p className="text-xs">
            Already have an ccount?{" "}
            <a href="#" className="underline underline-offset-4">
              login
            </a>
          </p>
        </div>

        <StepNavigation />
        <UserFormContextProider>{children}</UserFormContextProider>
      </div>
    </div>
  );
};

export default SignupLayout;
