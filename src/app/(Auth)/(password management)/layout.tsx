import React from "react";

const PasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-t from-main to-second-green min-h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white w-3/4 rounded-3xl p-5 py-10 my-10">
        {children}
      </div>
    </div>
  );
};

export default PasswordLayout;
