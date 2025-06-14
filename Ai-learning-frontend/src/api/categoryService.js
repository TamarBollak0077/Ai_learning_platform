import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5217/api";

export const fetchCategories = async () => {
  const res = await axios.get(`${API_URL}/category`);
  return res.data;
};

export const fetchSubCategories = async (categoryId) => {
  return axios.get(`/api/subCategory/${categoryId}`).then((res) => res.data);
};

