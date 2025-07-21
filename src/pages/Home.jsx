import React from 'react';
import HeroSection from '../components/HeroSection';
import MarketData from '../components/MarketData';
import VisualInsights from '../components/VisualInsights';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <HeroSection />
      <MarketData />
      <VisualInsights />
      <Footer />
    </div>
  );
}

export default Home;



