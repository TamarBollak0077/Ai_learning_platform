import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5217/api";

export const registerUser = async (data: { name: string; phone: string }) => {
  const res = await axios.post(`${API_URL}/user/create`, data);
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axios.get(`${API_URL}/user`);
  return res.data;
};

// loginUser עם phone ו-password, שמירת טוקן
export const loginUser = async (username: string, phone: string): Promise<any> => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: username, phone }),
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  // שמור טוקן ומידע על המשתמש
  if (data.Token || data.token) {
    localStorage.setItem('token', data.Token || data.token);
  }
  // שמור את כל המידע של המשתמש (כולל id) ב-localStorage
  localStorage.setItem('user', JSON.stringify({
    id: data.id,
    name: data.name,
    phone: data.phone,
    isAdmin: data.IsAdmin
  }));
  return data;
};

export const loginAdmin = async (username: string, phone: string): Promise<any> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Username: username, Phone: phone }),
  });

  if (!response.ok) throw new Error('Login failed');

  const data = await response.json();
  if (data.token || data.Token) {
    localStorage.setItem('token', data.token || data.Token);
  }
  return data;
};
