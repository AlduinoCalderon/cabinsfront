import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RecoveryForm from './RecoveryForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login');
  const { t } = useTranslation();
  const { login, register, resetPassword } = useAuth();


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
            onSubmit={async (data) => {
              await login(data.email, data.password);
              onClose();
            }}
            onSwitchToRegister={() => setMode('register')}
            onSwitchToRecovery={() => setMode('recovery')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSubmit={async (data) => {
              await register(data.email, data.password, data.name);
              onClose();
            }}
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'recovery':
        return (
          <RecoveryForm
            onSubmit={async (email) => {
              await resetPassword(email);
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