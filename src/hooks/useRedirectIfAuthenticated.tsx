"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);
};

export default useRedirectIfAuthenticated;
