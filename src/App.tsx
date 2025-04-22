import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import NavBar from './components/layout/NavBar';
import './i18n/config';
import './App.css';

function App() {
  return (
    <Router>
      <I18nProvider>
        <ThemeProvider>
          <div className="App">
            <NavBar />
            {/* Resto de tu aplicación */}
          </div>
        </ThemeProvider>
      </I18nProvider>
    </Router>
  );
}

export default App; 