import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE === "development" ? "http://localhost:8000" : "https://bookbazar-backend-gyov.onrender.com/",
  withCredentials: true,
});
