import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5217/api";

export const fetchPrompts = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/prompt/all`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
};

export const fetchUserPrompts = async (userId: string | number) => {
  const token = localStorage.getItem('token');
  if (!userId) throw new Error("User ID is missing");
  const res = await fetch(`${API_URL}/prompt/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
};

export const fetchAllPrompts = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/prompt/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.data;
};

export const sendPrompt = async (data) => {
  const res = await axios.post(`${API_URL}/prompt`, data);
  return res.data;
};