"use client";

import { usePathname } from "next/navigation";
import StepHeader from "./Step-header";
import StepNavigation from "./Step-navigation";

const hiddenPaths = ["/signup/validation"];

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (hiddenPaths.includes(pathname)) {
    return null; // Hide Header for validation page
  }

  return (
    <>
      <StepHeader />
      <StepNavigation />
    </>
  );
}
