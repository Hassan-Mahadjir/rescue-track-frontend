"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setItem } from "@/utils/storage";
import Cookies from "js-cookie";

export default function GoogleRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // Set cookies so middleware can read them
      Cookies.set("token", accessToken, { path: "/", sameSite: "Lax" });
      Cookies.set("refreshToken", refreshToken, { path: "/", sameSite: "Lax" });

      // Also store in localStorage if needed for client-side access
      setItem("token", accessToken);
      setItem("refreshToken", refreshToken);

      // Redirect after a short delay to ensure cookies are written
      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    } else {
      console.error("Missing tokens in URL.");
      // router.replace("/login");
    }
  }, [router, searchParams]);
}
