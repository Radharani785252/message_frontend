import React from 'react'
import NavbarTop from './components/Navbar/Index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BulkMessage from "./components/Sms/BulkMessage"
import Home from "./components/Index";
import OneMessage from "./components/Sms/Index"

const App = () => {
  return (
    <div >
      <NavbarTop />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sendonesms" element={<OneMessage />} />
          <Route path="/sendbulksms" element={<BulkMessage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App