import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Define API response structure (Modify as needed)

const baseURL = import.meta.env.VITE_API_URL!;

// Create Axios instance
const API = axios.create({
  baseURL: baseURL, // Replace with your API URL
  timeout: 10000, // Request timeout
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor - Attach Authorization Token
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Errors Globally
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data.message);
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken"); // Auto-logout on 401
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default API;
