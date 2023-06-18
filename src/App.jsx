// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";
import Exchanges from "./components/Exchanges";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/coin/:id" element={<CoinDetails/>}/>
        <Route path="/exchanges" element={<Exchanges />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
