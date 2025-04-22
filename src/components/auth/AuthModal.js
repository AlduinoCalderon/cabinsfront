import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RecoveryForm from './RecoveryForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'recovery'
  const { t } = useTranslation();
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return t('auth.loginTitle');
      case 'register':
        return t('auth.registerTitle');
      case 'recovery':
        return t('auth.recoveryTitle');
      default:
        return t('auth.loginTitle');
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setMode('register')}
            onSwitchToRecovery={() => setMode('recovery')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'recovery':
        return (
          <RecoveryForm
            onSwitchToLogin={() => setMode('login')}
            onSwitchToRegister={() => setMode('register')}
          />
        );
      default:
        return null;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    const email = e.target.recoveryEmail.value;
    
    if (!validateEmail(email)) {
      setError(t('error.email'));
      return;
    }
    
    // Aquí iría la lógica para enviar el correo de recuperación
    console.log('Enviando correo de recuperación a:', email);
    setError('');
  };

  return (
    <div className="auth-modal" onClick={onClose}>
      <div className="auth-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <h2>{getTitle()}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {renderForm()}
        {mode === 'recovery' && (
          <form onSubmit={handleRecoverySubmit} className="auth-form">
            <div className="recovery-description">
              <p>{t('auth.recoveryInstructions')}</p>
            </div>
            <div className="form-group">
              <label htmlFor="recoveryEmail">{t('auth.email')}</label>
              <input
                type="email"
                id="recoveryEmail"
                name="recoveryEmail"
                required
                className={error ? 'error' : ''}
                placeholder={t('auth.emailPlaceholder')}
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            <button type="submit" className="auth-button">
              {t('auth.sendRecoveryLink')}
            </button>
            <button
              type="button"
              className="back-to-login"
              onClick={() => {
                setMode('login');
                setError('');
              }}
            >
              {t('auth.backToLogin')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal; 