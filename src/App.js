// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PortfolioPage from "./pages/Portfolio";
import AlertsPage from "./pages/AlertsPage";
import Layout from "./components/Layout";
import Market from "./pages/Market";
import MarketData from "./components/MarketData";


function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/market" element={<Market />} />
        <Route path="/crypto-prices" element={<MarketData />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;




