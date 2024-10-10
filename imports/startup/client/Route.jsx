import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "../../ui/pages/App.jsx";
import HomePage from "../../ui/pages/HomePage.jsx";
import { Test } from "../../ui/pages/test.jsx";
import LoginPage from "../../ui/pages/LoginPage.jsx";  // Import the new login page
import MyAccount from "../../ui/pages/MyAccount.jsx";
import Admin from "../../ui/pages/Admin.jsx";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/homepage" element={<App />} /> */}
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<LoginPage />} /> {/* Add the login route */}
      <Route path="/myaccount" element={<MyAccount />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </Router>
);
