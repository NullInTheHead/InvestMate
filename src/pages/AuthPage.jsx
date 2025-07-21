// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ensure your firebase.js exports auth
import "../styles/AuthPage.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/account");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </p>
    </div>
  );
}

export default AuthPage;
