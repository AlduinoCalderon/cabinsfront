import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RecoveryForm from './RecoveryForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login');
  const { t } = useTranslation();


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
            onSubmit={(data) => {
              console.log('Login data:', data);
            }}
            onSwitchToRegister={() => setMode('register')}
            onSwitchToRecovery={() => setMode('recovery')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSubmit={(data) => {
              console.log('Register data:', data);
            }}
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'recovery':
        return (
          <RecoveryForm
            onSubmit={(email) => {
              console.log('Recovery email:', email);
            }}
            onSwitchToLogin={() => setMode('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h3>{getTitle()}</h3>
          <button className="auth-modal-close" onClick={onClose}>×</button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthModal; 