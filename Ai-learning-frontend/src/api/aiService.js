import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5217/api";

// שליחת prompt ל-AI
export const sendPrompt = async (promptText) => {
  console.log("prompt to send:", promptText); // כאן תראי מחרוזת!
  const res = await axios.post(
    `${API_URL}/ai/chat`,
    { prompt: promptText },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};

export const validatePrompt = async ({ userPrompt, categoryName, subCategoryName }) => {
  const res = await axios.post(
    `${API_URL}/subCategory/validate-prompt`,
    { userPrompt, categoryName, subCategoryName }
  );
  return res.data;
};