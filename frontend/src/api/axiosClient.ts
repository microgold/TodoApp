import axios, { AxiosError } from "axios";

// ✅ Configure base URL to match your ASP.NET backend
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s request timeout
});

// ----------------------------
// Interceptors
// ----------------------------

// Log requests (optional, useful during dev)
axiosClient.interceptors.request.use(
  (config) => {
    console.log(`[Axios] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Unified error handling for responses
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error(`[Axios Error] ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error("[Axios Error] No response from server:", error.message);
    } else {
      console.error("[Axios Error] Request setup failed:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
