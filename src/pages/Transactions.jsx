import React, { useState } from "react";
import "../styles/Transactions.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: "buy", asset: "", amount: "", price: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTxn = { ...form, date: new Date().toLocaleString() };
    setTransactions([newTxn, ...transactions]);
    setForm({ type: "buy", asset: "", amount: "", price: "" });
  };

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <form className="txn-form" onSubmit={handleSubmit}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input name="asset" placeholder="Asset (e.g. AAPL, BTC)" value={form.asset} onChange={handleChange} required />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>

      <div className="txn-list">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((txn, idx) => (
            <div key={idx} className={`txn-item ${txn.type}`}>
              <strong>{txn.type.toUpperCase()}</strong> {txn.amount} of {txn.asset} at ${txn.price} on {txn.date}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;
