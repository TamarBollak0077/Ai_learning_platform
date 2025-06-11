import { Link } from "react-router-dom";

const NavBar = () => {
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

      {/* Login button - right */}
      <Link to="/login" style={{ marginLeft: "auto" }}>
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
