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
import ReservarPage from './pages/user/ReservarPage';
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
                    <Route path="/reservar" element={<ReservarPage />} />
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
