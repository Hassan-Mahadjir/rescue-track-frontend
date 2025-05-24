// src/services/api/http.ts
import axios from "axios";
import Cookies from "js-cookie";
import { getItem, removeItem, setItem } from "@/utils/storage";
import { AuthDataType } from "@/types/common.type";

const baseurl = "http://192.168.37.29:3000";

const http = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ── REQUEST INTERCEPTOR ─────────────────────────────────────
// Synchronous handler only—no `async` here:
http.interceptors.request.use(
  (config) => {
    // prefer cookie, fallback to localStorage
    const token =
      Cookies.get("token") ??
      (typeof window !== "undefined" ? localStorage.getItem("token") : null);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR ────────────────────────────────────
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Refresh token on 401, except refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post<AuthDataType>(
          `${baseurl}/auth/refresh`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = data;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
          Cookies.set("token", accessToken, { path: "/", sameSite: "Lax" });
        }
        if (newRefreshToken) {
          await setItem("refreshToken", newRefreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        console.error("🔴 Token refresh failed:", refreshError);
        await removeItem("token");
        await removeItem("refreshToken");
        Cookies.remove("token");
        return Promise.reject(refreshError);
      }
    }

    // Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden:", error.response.data);
      window.location.href = "/unauthorized";
      return Promise.reject(
        new Error("You don't have permission to access this resource")
      );
    }

    return Promise.reject(error);
  }
);

export default http;
