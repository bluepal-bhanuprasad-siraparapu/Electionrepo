import axios from "axios";

// Support using an environment variable so the url can be changed in docker-compose builds
const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
