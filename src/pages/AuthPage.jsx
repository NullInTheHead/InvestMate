import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import "../styles/AuthPage.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); 
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email,
          fullName,
          phone: "",
          preferences: {
            emailAlerts: true,
            pushAlerts: false,
            smsAlerts: false,
            priceAlerts: true,
            portfolioUpdates: true,
            marketNews: false,
          },
        });
      }
      navigate("/account");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>{isLogin ? "Log In to InvestMate" : "Create an InvestMate Account"}</h2>
        <form onSubmit={handleAuth} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
        </form>
        <p className="auth-toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;


