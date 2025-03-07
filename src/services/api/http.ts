import { getItem, removeItem } from "@/utils/storage";
import axios from "axios";

const http = axios.create({
  baseURL: "http://192.168.0.108:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(async (config) => {
  const token = await getItem("token"); // Ensure we wait for the token to be retrieved

  // console.log(`${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);

  // Ensure headers exist before modifying
  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    // console.info("RESPONSE", JSON.stringify(response.data, undefined, 4));
    return response;
  },
  (error) => {
    console.error("ERROR", JSON.stringify(error.response, undefined, 4));
    if (error.response?.status === 401) {
      removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default http;
