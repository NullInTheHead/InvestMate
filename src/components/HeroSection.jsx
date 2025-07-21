import React from 'react';
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Smarter Investing Starts Here</h1>
        <p>Track your portfolio, monitor live prices, and stay ahead with insights.</p>
        <button>Get Started</button>
      </div>
    </section>
  );
}

export default HeroSection;