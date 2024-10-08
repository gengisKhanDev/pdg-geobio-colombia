import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "../../ui/pages/App.jsx";
import HomePage from "../../ui/pages/HomePage.jsx";
import  { Test }  from "../../ui/pages/test.jsx";
import LoginPage from "../../ui/pages/LoginPage.jsx";  // Import the new login page
import MyAccount from "../../ui/pages/MyAccount.jsx";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<LoginPage />} /> {/* Add the login route */}
      <Route path="/myaccount" element={<MyAccount />} />
    </Routes>
  </Router>
);
