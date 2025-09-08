import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;