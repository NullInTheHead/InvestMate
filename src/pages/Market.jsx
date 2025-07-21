import React, { useEffect, useState } from "react";
import "./../styles/Market.css"; // create this next

function Market() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("stocks");

  useEffect(() => {
    const dummyStocks = [
      { name: "AAPL", price: 196.23 },
      { name: "GOOGL", price: 128.56 },
      { name: "MSFT", price: 320.34 },
    ];

    const dummyCrypto = [
      { name: "BTC", price: 29753.45 },
      { name: "ETH", price: 1875.22 },
      { name: "SOL", price: 23.12 },
    ];

    setData(filter === "stocks" ? dummyStocks : dummyCrypto);
  }, [filter]);

  return (
    <div className="market-page">
      <h2>Market Data</h2>
      <div className="filter-buttons">
        <button
          className={filter === "stocks" ? "active" : ""}
          onClick={() => setFilter("stocks")}
        >
          Stocks
        </button>
        <button
          className={filter === "crypto" ? "active" : ""}
          onClick={() => setFilter("crypto")}
        >
          Crypto
        </button>
      </div>

      <div className="market-list">
        {data.map((item, idx) => (
          <div key={idx} className="market-item">
            <h4>{item.name}</h4>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;

