import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../styles/Market.css';

function Market() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchCoins = async (pageNumber) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNumber}&sparkline=false`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setCoins((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error('Error fetching coins:', err);
    }
  };

  useEffect(() => {
    fetchCoins(page);
  }, [page]);

  const lastCoinRef = useCallback((node) => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [hasMore]);

  return (
    <section className="market-data">
      <h2>Live Crypto Prices</h2>
      <div className="crypto-grid">
        {coins.map((coin, index) => {
          if (index === coins.length - 1) {
            return (
              <div className="crypto-card" key={coin.id} ref={lastCoinRef}>
                <img src={coin.image} alt={coin.name} />
                <h3>{coin.name}</h3>
                <p>${coin.current_price.toLocaleString()}</p>
              </div>
            );
          }
          return (
            <div className="crypto-card" key={coin.id}>
              <img src={coin.image} alt={coin.name} />
              <h3>{coin.name}</h3>
              <p>${coin.current_price.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
      {!hasMore && <p className="end-message">You’ve reached the end.</p>}
    </section>
  );
}

export default Market;


