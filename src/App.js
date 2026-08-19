import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { StyleSheetManager } from 'styled-components';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/public/HomePage';
import CabinsPage from './pages/user/CabinsPage';
import CabinDetailsPage from './pages/user/CabinDetailsPage';
import ReservarPage from './pages/user/ReservarPage';
import DashboardPage from './pages/user/DashboardPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'theme'}>
      <Router>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="app">
                <NavBar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cabins" element={<CabinsPage />} />
                    <Route path="/cabins/:id" element={<CabinDetailsPage />} />
                    <Route path="/reservar" element={<ProtectedRoute><ReservarPage /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Router>
    </StyleSheetManager>
  );
}

export default App;
