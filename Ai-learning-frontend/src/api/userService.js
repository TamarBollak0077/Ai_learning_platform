import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5217/api";

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/user/create`, data);
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axios.get(`${API_URL}/user`);
  return res.data;
};

export const loginUser = async (phone) => {
  const res = await axios.post(`${API_URL}/user/login`, { phone });
  return res.data;
};