import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Akses URL dari .env

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  
});

api.interceptors.request.use(
  (config) => {
    if(config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data"; // Tambahkan header untuk form data
    } else {
      config.headers["Content-Type"] = "application/json"; // Tambahkan header
    }

    const token = localStorage.getItem("token"); // Ambil token dari local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Tambahkan token ke header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
