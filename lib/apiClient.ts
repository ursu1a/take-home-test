import axios from "axios";
import axiosRetry from "axios-retry";

import { RAWG_BASE_URL } from "@/lib/constants";

const API_KEY = process.env.RAWG_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in .env.local");
}

const apiClient = axios.create({
  baseURL: RAWG_BASE_URL,
  params: {
    key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Common error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

// Repeat the same request 3 times when network is unavailable
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
});

export default apiClient;
