import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { loginUser, loginAdmin } from "../api/userService";
import { useNavigate, Link, useLocation } from "react-router-dom";

const ADMIN_PASSWORD = "Admin0123";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = new URLSearchParams(location.search).get("admin") === "true";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isAdminLogin) {
      try {
        const data = await loginAdmin(username, password);
        // ודאי שהטוקן נשמר לפני הניווט!
        if (data.token || data.Token) {
          localStorage.setItem('token', data.token || data.Token);
        }
        dispatch(setUser({ username, phone: password }));
        navigate("/admin");
      } catch {
        setError("סיסמת מנהל שגויה. אין הרשאה.");
      }
    } else {
      try {
        const data = await loginUser(username, phone);
        dispatch(setUser({
          id: data.id,
          name: data.name,
          phone: data.phone,
          isAdmin: data.IsAdmin
        }));
        navigate("/dashboard");
      } catch {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 340,
          padding: "2em",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px #0001",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "1em", textAlign: "center" }}>
          {isAdminLogin ? "Admin Login" : "Login"}
        </h2>
        {/* הצג שדה טלפון רק אם זה לא אדמין */}
        {!isAdminLogin && (
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              width: "100%",
              marginBottom: 10,
              padding: "0.5em",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1em",
              textAlign: "center",
            }}
          />
        )}
        {/* הצג שדה סיסמה רק אם זה אדמין */}
        {isAdminLogin && (
          <div style={{ width: "100%", marginBottom: "1em" }}>
            <label style={{ display: "block", marginBottom: "0.5em", fontSize: "0.9em" }}>
              Admin Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5em",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "1em",
                textAlign: "center",
              }}
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: 10,
            padding: "0.5em",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1em",
            textAlign: "center",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.5em",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1em",
            cursor: "pointer",
            marginTop: "0.5em",
          }}
        >
          {isAdminLogin ? "כניסת מנהל" : "Login"}
        </button>
        {error && (
          <div
            style={{
              color: "red",
              marginTop: 10,
              fontSize: "0.9em",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        {/* הצג קישור לסיינאפ רק אם זה לא אדמין */}
        {!isAdminLogin && (
          <div
            style={{
              marginTop: "1.5em",
              fontSize: "0.95em",
            }}
          >
            <span>Not registered yet? </span>
            <Link
              to="/signup"
              style={{
                color: "#1976d2",
                textDecoration: "underline",
              }}
            >
              Sign up
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;