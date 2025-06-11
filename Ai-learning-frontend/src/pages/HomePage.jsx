import { Link } from "react-router-dom";

const HomePage = () => (
  <div
    style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
    }}
  >
    <h1>Welcome to the AI Learning Platform!</h1>
    <p>Please log in to get started.</p>
    <Link to="/login">
      <button
        style={{
          marginTop: "1em",
          padding: "0.5em 1.5em",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "1em",
          cursor: "pointer",
        }}
      >
        Go to Login
      </button>
    </Link>
  </div>
);

export default HomePage;
