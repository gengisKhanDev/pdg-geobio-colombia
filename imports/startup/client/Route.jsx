import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from '../../ui/pages/App.jsx';
import  HomePage  from '../../ui/pages/HomePage.jsx';

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  </Router>
);
