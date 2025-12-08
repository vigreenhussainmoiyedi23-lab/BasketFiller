import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 your backend base URL
  withCredentials: true, // 👈 allows sending cookies (for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
