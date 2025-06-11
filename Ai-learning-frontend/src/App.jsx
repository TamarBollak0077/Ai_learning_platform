import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dashboard from './pages/Dashboard.jsx';
import AdminPage from './pages/AdminPage.jsx';
import Login from './pages/Login.jsx';
import NavBar from './components/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // אם אין משתמש מחובר, והעמוד אינו דף הבית או דף הלוגין, ננתב לדף הבית
    if (
      !user &&
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
      && location.pathname !== "/admin"
    ) {
      navigate("/", { replace: true });
    }
    // אם יש משתמש, לא נבצע ניתוב
  }, [user, location.pathname, navigate]);

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;