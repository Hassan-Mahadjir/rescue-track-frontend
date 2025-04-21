import axios from "axios";
import { getItem, removeItem, setItem } from "@/utils/storage";
import Cookies from "js-cookie";
import { AuthDataType } from "@/types/common.type";

const baseurl = "http://192.168.51.26:3000";

const http = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach access token to every request
http.interceptors.request.use(async (config) => {
  const token = (await getItem("token")) || Cookies.get("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle response globally (refresh token logic)
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors from protected routes
    const isTokenExpired =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh");

    if (isTokenExpired) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          (await getItem("refreshToken")) || Cookies.get("refreshToken");

        if (!refreshToken) {
          console.warn("⚠️ No refresh token available");
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post<AuthDataType>(
          `${baseurl}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            withCredentials: true,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        // Store new tokens
        if (accessToken) {
          await setItem("token", accessToken);
          Cookies.set("token", accessToken, { path: "/", sameSite: "Lax" });
        }

        if (newRefreshToken) {
          await setItem("refreshToken", newRefreshToken);
          Cookies.set("refreshToken", newRefreshToken, {
            path: "/",
            sameSite: "Lax",
          });
        }

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token expired or invalid");

        // Clear everything & optionally redirect user to login
        await removeItem("token");
        await removeItem("refreshToken");
        Cookies.remove("token");
        Cookies.remove("refreshToken");

        // You can redirect to login or show a message here
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
