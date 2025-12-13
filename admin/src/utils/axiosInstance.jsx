import axios from "axios";
const baseurl="http://localhost:5000"
const axiosInstance = axios.create({
  baseURL: `${baseurl}/api`, // 👈 your backend base URL
  withCredentials: true, // 👈 allows sending cookies (for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
