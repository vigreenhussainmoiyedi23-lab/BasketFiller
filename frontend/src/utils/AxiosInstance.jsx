import axios from "axios";
const baseurl = "https://basketfiller.onrender.com";
const axiosInstance = axios.create({
  baseURL: `${baseurl}/api`, // 👈 your backend base URL
  withCredentials: true, // 👈 allows sending cookies (for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      // Retry once after 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
      return axiosInstance.request(error.config);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
