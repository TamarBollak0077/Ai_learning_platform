import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import { RootState } from "./types/models";
import { setUser } from './redux/slices/userSlice';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) dispatch(setUser(user));
  }, []);

  useEffect(() => {
    if (
      !user &&
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/admin"
    ) {
      navigate("/", { replace: true });
    }
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
};

export default App;