import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './utils/AuthContext'
import { AppointmentPage } from './AppointmentPage/AppointmentPage';
import HomePage from '../components/HomePage';
import { AuthProvider } from './utils/AuthContext';
import './App.css'
import Header from '../components/header';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/appointments/:id" element={<AppointmentPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
