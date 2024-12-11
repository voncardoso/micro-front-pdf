import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './modules/home/pages/HomePage';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { ContactPage } from './modules/contact/pages/ContactPage';
import { CompliancePage } from './modules/compliance/pages/CompliancePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;