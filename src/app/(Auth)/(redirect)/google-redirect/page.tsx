// pages/google-redirect.tsx (or /app/google-redirect/page.tsx in App Router)
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth-service";
import Cookies from "js-cookie";

export default function GoogleRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("accessToken");
        console.log("Token from cookies:", token);
      } catch (err) {}
    };

    fetchUser();
  }, []);

  return <p>Logging you in...</p>;
}
