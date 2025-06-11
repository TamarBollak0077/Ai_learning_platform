import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { loginUser } from "../api/userService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const user = await loginUser(phone);
    dispatch(setUser(user));
    if (user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } catch {
    setError("Login failed. Please try again.");
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
        <h2 style={{ marginBottom: "1em", textAlign: "center" }}>Login</h2>
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
          Login
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
      </form>
    </div>
  );
};

export default Login;