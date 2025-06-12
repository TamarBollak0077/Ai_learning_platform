import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    // מעביר לעמוד login עם פרמטר שמציין שמדובר באדמין
    navigate("/login?admin=true");
  };

  return (
    <nav
      style={{
        width: "100%",
        height: "64px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2em",
        background: "#f0f0f0",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0 2px 8px #0001",
      }}
    >
      {/* Logo - left */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#333",
          fontWeight: "bold",
          fontSize: "1.3em",
        }}
      >
        🧠 AI Learning
      </Link>

      {/* כפתור Admin Dashboard */}
      <button
        onClick={handleAdminClick}
        style={{
          marginLeft: "auto",
          marginRight: "1em",
          padding: "0.5em 1.5em",
          fontSize: "1em",
          borderRadius: "20px",
          border: "none",
          background: "#ff69b4", // ורוד זורח
          color: "#fff",
          minWidth: "120px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 8px #ff69b444",
          transition: "background 0.2s",
        }}
      >
        Admin Dashboard
      </button>

      {/* Login button - right */}
      <Link to="/login">
        <button
          style={{
            padding: "0.5em 1.5em",
            fontSize: "1em",
            borderRadius: "20px",
            border: "none",
            background: "#1976d2",
            color: "#fff",
            minWidth: "90px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </Link>
    </nav>
  );
};

export default NavBar;
