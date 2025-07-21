import React, { useEffect, useState } from 'react';
import '../styles/MarketData.css';

function MarketData() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
        );
        const data = await res.json();
        setPrices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prices:', err);
      }
    };

    fetchPrices();
  }, []);

  return (
    <section className="market-data">
      <h2>Live Crypto Prices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="crypto-grid">
          {Object.entries(prices).map(([coin, value]) => (
            <div className="crypto-card" key={coin}>
              <h3>{coin.charAt(0).toUpperCase() + coin.slice(1)}</h3>
              <p>${value.usd.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MarketData;
