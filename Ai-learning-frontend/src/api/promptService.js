import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5217/api";

export const fetchUserPrompts = async (userId) => {
  const res = await axios.get(`${API_URL}/prompt/user/${userId}`);
  return res.data;
};

export const fetchAllPrompts = async () => {
  const res = await axios.get(`${API_URL}/prompt/all`);
  return res.data;
};

export const sendPrompt = async (data) => {
  const res = await axios.post(`${API_URL}/prompt`, data);
  return res.data;
};