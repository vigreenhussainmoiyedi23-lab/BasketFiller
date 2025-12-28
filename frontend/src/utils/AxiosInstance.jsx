import axios from "axios";
const baseurl = "https://basketfiller.onrender.com";
const axiosInstance = axios.create({
  baseURL: `${baseurl}/api`, // 👈 your backend base URL
  withCredentials: true, // 👈 allows sending cookies (for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
