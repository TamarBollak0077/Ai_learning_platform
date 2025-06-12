import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrompts } from '../redux/slices/promptSlice';
import { fetchUsers } from '../api/userService';
import { fetchCategories, fetchSubCategories } from '../api/categoryService';
import { RootState, User, Category, SubCategory, Prompt } from '../types/models';

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const { list: prompts, loading, error } = useSelector((state: RootState) => state.prompts);

  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  // סינון
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    dispatch(fetchPrompts() as any);
    fetchUsers().then(setUsers);
    fetchCategories().then(setCategories);
    // אל תקרא כאן ל-fetchSubCategories!
  }, [dispatch]);

  // טען תתי־קטגוריה רק כאשר נבחרה קטגוריה
  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory).then(setSubCategories);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const getUserName = (id: number | string) => users.find(u => String(u.id) === String(id))?.name || id;
  const getCategoryName = (id: number | string) => categories.find(c => String(c.id) === String(id))?.name || id;
  const getSubCategoryName = (id: number | string) =>
    subCategories.find(s => String(s.id) === String(id))?.name || id;

  // סינון הפרומפטים
  const filteredPrompts = (prompts as Prompt[]).filter(p => {
    const byUser = selectedUser ? String(p.userId) === selectedUser : true;
    const byCategory = selectedCategory ? String(p.categoryId) === selectedCategory : true;
    const bySubCategory = selectedSubCategory ? String(p.subCategoryId) === selectedSubCategory : true;
    const byDate = selectedDate
      ? new Date(p.createdAt).toISOString().slice(0, 10) === selectedDate
      : true;
    return byUser && byCategory && bySubCategory && byDate;
  });

  if (loading) return <div className="text-center py-10 text-gray-600">Loading prompts...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Prompts</h2>
      {/* סינון */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedUser}
          onChange={e => setSelectedUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedSubCategory}
          onChange={e => setSelectedSubCategory(e.target.value)}
        >
          <option value="">All Sub-Categories</option>
          {subCategories.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          placeholder="Select date"
        />

        <button
          onClick={() => {
            setSelectedUser("");
            setSelectedCategory("");
            setSelectedSubCategory("");
            setSelectedDate("");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Clear Filters
        </button>
      </div>

      {/* טבלה */}
      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              {["User", "Category", "Sub-Category", "Prompt", "Response", "Date"].map(header => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredPrompts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400 italic">
                  No prompts found with the selected filters.
                </td>
              </tr>
            ) : (
              filteredPrompts.map(p => (
                <tr key={p.id} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">{getUserName(p.userId)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">{getCategoryName(p.categoryId)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">{getSubCategoryName(p.subCategoryId)}</td>
                  <td className="px-4 py-2 whitespace-wrap max-w-xs break-words">{p.prompt}</td>
                  <td className="px-4 py-2 whitespace-wrap max-w-xs break-words">{p.response}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-600 text-sm">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
