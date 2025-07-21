import React from 'react';
import '../styles/PortfolioSection.css';

function PortfolioSection() {
  const portfolio = [
    { name: 'Apple (AAPL)', invested: 20000, returns: '+12%' },
    { name: 'Bitcoin (BTC)', invested: 15000, returns: '-5%' },
    { name: 'Tesla (TSLA)', invested: 10000, returns: '+25%' },
  ];

  return (
    <div className="portfolio">
      <h2>Your Portfolio</h2>
      <div className="portfolio-list">
        {portfolio.map((item, index) => (
          <div className="portfolio-card" key={index}>
            <h3>{item.name}</h3>
            <p>Invested: ₹{item.invested}</p>
            <p className={item.returns.startsWith('+') ? 'positive' : 'negative'}>
              Returns: {item.returns}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioSection;
