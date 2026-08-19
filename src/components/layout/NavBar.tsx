import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import './NavBar.css';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setShowUserMenu(false);
      }
      // Cerrar menú de navegación si se hace clic fuera
      if (menuRef.current && !menuRef.current.contains(target) && 
          !target.closest('.nav-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const toggleAuthForm = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsAuthOpen(!isAuthOpen);
    }
  };



  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'show-menu' : ''}`} ref={menuRef}>
          <ul className="nav-list">
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/cabins');
                }}
              >
                {t.cabins}
              </button>
            </li>

            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={scrollToContact}
              >
                {t.contact}
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'EN' : 'ES'}
          </button>

          {user && (
            <Link to="/dashboard" style={{ color: 'var(--text-color)', marginLeft: '1rem', fontWeight: 'bold' }}>
              Mi Panel
            </Link>
          )}

          <div className="user-menu" ref={userMenuRef}>
            <button className="user-button" onClick={toggleAuthForm}>
              {user ? (
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {user.email.charAt(0).toUpperCase()}
                </span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </button>
            {showUserMenu && user && (
              <div className="user-dropdown" style={{ position: 'absolute', right: 0, top: '100%', background: 'white', border: '1px solid #ccc', borderRadius: '4px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '150px', zIndex: 1000 }}>
                <div style={{ paddingBottom: '10px', borderBottom: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>{user.email}</div>
                <button onClick={() => { navigate('/admin'); setShowUserMenu(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '5px 0' }}>Dashboard</button>
                <button onClick={() => { logout(); setShowUserMenu(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '5px 0', color: '#e53e3e' }}>Cerrar sesión</button>
              </div>
            )}
          </div>

          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </nav>

      <div className="overlay" onClick={() => setIsMenuOpen(false)} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};

export default NavBar; 