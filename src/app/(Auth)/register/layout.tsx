"use client";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-gradient-to-t from-main to-second-green min-h-screen">
      <div className="flex flex-col ">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
