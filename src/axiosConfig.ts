// src/utils/axiosConfig.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create a custom instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api", // Adjust this to your API URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Use window.location.href instead of assigning to window.location
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
