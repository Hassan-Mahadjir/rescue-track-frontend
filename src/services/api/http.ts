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

http.interceptors.request.use(async (config) => {
  const token = (await getItem("token")) || Cookies.get("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let retryCount = 0;
const MAX_RETRIES = 2;

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      retryCount < MAX_RETRIES &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      retryCount++;

      try {
        const refreshResponse = await axios.post<AuthDataType>(
          `${baseurl}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        if (newAccessToken) {
          await setItem("token", newAccessToken);
          Cookies.set("token", newAccessToken, { path: "/", sameSite: "Lax" });

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return http(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear token & redirect
        await removeItem("token");
        Cookies.remove("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Logout on persistent 401
    if (error.response?.status === 401 && retryCount >= MAX_RETRIES) {
      await removeItem("token");
      Cookies.remove("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default http;
