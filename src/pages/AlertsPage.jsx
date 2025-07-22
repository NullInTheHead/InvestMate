import React, { useState } from "react";
import "../styles/AlertsPage.css";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, text: "BTC crosses $70,000" },
    { id: 2, text: "TSLA drops below $600" },
  ]);
  const [newAlert, setNewAlert] = useState("");

  const handleAddAlert = () => {
    if (newAlert.trim() === "") return;
    setAlerts([...alerts, { id: Date.now(), text: newAlert }]);
    setNewAlert("");
  };

  return (
    <>
      
      <div className="alerts-container">
        <h2>Your Smart Alerts</h2>
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id}>{alert.text}</li>
          ))}
        </ul>
        <div className="add-alert">
          <input
            type="text"
            placeholder="Enter alert..."
            value={newAlert}
            onChange={(e) => setNewAlert(e.target.value)}
          />
          <button onClick={handleAddAlert}>Add Alert</button>
        </div>
      </div>
      
    </>
  );
};

export default AlertsPage;
