"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

const hiddenPaths = [
  "/login",
  "/signup",
  "/signup/step-one",
  "/signup/step-two",
  "/signup/step-three",
  "/validation",
  "/forgot-password",
  "/google-redirect",
  "/microsoft-redirect",
  "/change-password",
];

export default function NavBarWrapper() {
  const pathname = usePathname();

  if (hiddenPaths.includes(pathname)) {
    return null; // Hide NavBar for login/signup pages
  }

  return <NavBar />;
}
