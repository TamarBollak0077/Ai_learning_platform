
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/ai-learning-bg.jpg')" }}>
      <div className="bg-white/80 min-h-screen flex items-center justify-center flex-col px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">ברוכים הבאים לפלטפורמת הלמידה מבוססת AI</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
          למדו בצורה חכמה, מהירה ומותאמת אישית – מתי שתרצו ואיך שתרצו.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          התחילו ללמוד עכשיו
        </button>
      </div>
    </div>
  );
}
