import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { registerUser } from "../api/userService";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const user = await registerUser({ name, phone });
      dispatch(setUser(user));
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
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
        onSubmit={handleSignup}
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
        <h2 style={{ marginBottom: "1em", textAlign: "center" }}>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: 10,
            padding: "0.5em",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1em",
            textAlign: "center"
          }}
        />
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
            textAlign: "center"
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
            marginTop: "0.5em"
          }}
        >
          Sign Up
        </button>
        {error && (
          <div style={{ color: "red", marginTop: 10, fontSize: "0.9em", textAlign: "center" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;