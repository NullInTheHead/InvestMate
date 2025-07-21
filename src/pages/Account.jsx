import React from "react";
import "../styles/Account.css";
import { useAuth } from "../context/AuthContext"; // Assuming you have AuthContext

function Account() {
  const { currentUser, logout } = useAuth(); // Firebase Auth

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="account-page">
      <h2>Account</h2>
      {currentUser ? (
        <div className="account-details">
          <p><strong>Email:</strong> {currentUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default Account;
