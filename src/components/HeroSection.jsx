import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth'); 
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Smarter Investing Starts Here</h1>
        <p>Track your portfolio, monitor live prices, and stay ahead with insights.</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </section>
  );
}

export default HeroSection;
