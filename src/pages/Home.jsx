import React from 'react';
import HeroSection from '../components/HeroSection';
import MarketData from '../components/MarketData';
import VisualInsights from '../components/VisualInsights';
import { Link } from "react-router-dom";


function Home() {
  return (
    <div>
      <HeroSection />
      <MarketData />
      <VisualInsights />
      
    </div>
  );
}

export default Home;



