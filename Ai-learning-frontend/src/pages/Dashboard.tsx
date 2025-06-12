import React, { useEffect, useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { fetchCategories, fetchSubCategories } from "../api/categoryService";
import { sendPrompt, validatePrompt } from "../api/aiService";
import { fetchUserPrompts } from "../api/promptService";
import {
  Category,
  SubCategory,
  User,
  PromptHistoryItem,
  RootState
} from "../types/models";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(categoryId).then(setSubCategories);
    } else {
      setSubCategories([]);
    }
  }, [categoryId]);

  useEffect(() => {
    if (user?.id) {
      fetchUserPrompts(user.id).then(setHistory);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    try {
      await validatePrompt({
        userPrompt,
        categoryName: categories.find((c) => c.id === Number(categoryId))?.name,
        subCategoryName: subCategories.find((s) => s.id === Number(subCategoryId))?.name,
      });
      const res = await sendPrompt(userPrompt);
      setResponse(res.response || res);
      setHistory((prev) => [res, ...prev]);
      setUserPrompt("");
    } catch (err: any) {
      if (
        typeof err.response?.data === "string" &&
        err.response.data.includes("insufficient_quota")
      ) {
        setResponse("חרגת מהמכסה שלך ב-OpenAI. פנה למנהל המערכת או בדוק את הגדרות המנוי שלך.");
      } else if (err.response?.status === 429) {
        setResponse("הגעת למגבלת שימוש. נסה שוב מאוחר יותר.");
      } else if (err.response?.data) {
        setResponse(err.response.data);
      } else {
        setResponse("אירעה שגיאה לא צפויה. נסה שוב מאוחר יותר.");
      }
    }
    setLoading(false);
  };

  console.log(user);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Learning Platform</h1>
        <div className="text-lg">
          hello{user?.name ? `, ${user.name}` : ", משתמש"}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* היסטוריה */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-xl border border-gray-300">
          <h3 className="text-center text-lg font-semibold mb-3">History</h3>
          <ul className="space-y-3">
            {history.length === 0 ? (
              <li className="text-gray-500 text-center">No history yet</li>
            ) : (
              history.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <div className="font-semibold">{item.prompt}</div>
                  <div className="text-sm text-gray-600">{item.response?.slice(0, 40)}...</div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* טופס */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Select Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">--</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Select Sub–Category</label>
              <select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                required
                disabled={!categoryId}
                className="w-full p-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
              >
                <option value="">--</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Enter your prompt:</label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              required
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <div className="mt-6">
            <div className="font-semibold mb-2">AI Response</div>
            <div className="min-h-[80px] border border-gray-300 rounded-lg bg-gray-50 p-4">
              {response}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
