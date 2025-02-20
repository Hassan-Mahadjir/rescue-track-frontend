import React from "react";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-t from-main to-second-green h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white w-3/4 h-3/4 rounded-3xl p-4">
        <div></div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default SignupLayout;
