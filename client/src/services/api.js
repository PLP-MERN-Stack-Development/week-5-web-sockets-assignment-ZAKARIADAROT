import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const fetchMessages = () => api.get("/messages");
export const fetchUsers = () => api.get("/users");

export default api;
