import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { StyleSheetManager } from 'styled-components';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/public/HomePage';
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
                  <HomePage />
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
