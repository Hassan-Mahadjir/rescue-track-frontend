import axios from "axios";
import { getItem, removeItem, setItem } from "@/utils/storage";
import Cookies from "js-cookie";
import { AuthDataType } from "@/types/common.type";
const baseurl = "http://192.168.31.234:3000";

const http = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach access token to each request
http.interceptors.request.use(async (config) => {
  // console.log("🔑 Token from cookies:", Cookies.get("token"));

  const token = Cookies.get("token") || (await getItem("token"));
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle response errors globally
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite loop and skip refresh for refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getItem("refreshToken");

        if (!refreshToken) {
          console.error("No refresh token available");
          throw new Error("No refresh token available");
        }

        // Try to refresh tokens
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

        if (accessToken) {
          await setItem("token", accessToken);
          Cookies.set("token", accessToken, { path: "/", sameSite: "Lax" });
        }

        if (newRefreshToken) {
          await setItem("refreshToken", newRefreshToken);
        }

        // Retry original request with new access token
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

    if (error.response?.status === 403) {
      const errorMessage = "You don't have permission to access this resource";
      console.error("Access forbidden:", error.response.data);
      window.location.href = "/unauthorized";
      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(error);
  }
);

export default http;
