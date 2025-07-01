import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE === "development" ? "http://localhost:8000" : "https://bookbazar-backend-ap9n.onrender.com/",
  withCredentials: true,
});
 