import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RecoveryForm from './RecoveryForm';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeForm, setActiveForm] = useState<'login' | 'register' | 'recovery'>('login');
  const { t } = useI18n();

  const handleLoginSubmit = (email: string, password: string) => {
    // TODO: Implementar lógica de login
    console.log('Login:', email, password);
  };

  const handleRegisterSubmit = (name: string, email: string, password: string) => {
    // TODO: Implementar lógica de registro
    console.log('Register:', name, email, password);
  };

  const handleRecoverySubmit = (email: string) => {
    // TODO: Implementar lógica de recuperación
    console.log('Recovery:', email);
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>

        <div className="auth-modal-header">
          <h2>{t(`auth.${activeForm}.title`)}</h2>
        </div>

        <div className="auth-modal-content">
          {activeForm === 'login' && (
            <LoginForm 
              onSubmit={handleLoginSubmit}
              onSwitchToRegister={() => setActiveForm('register')}
              onForgotPassword={() => setActiveForm('recovery')}
            />
          )}
          {activeForm === 'register' && (
            <RegisterForm 
              onSubmit={handleRegisterSubmit}
              onSwitchToLogin={() => setActiveForm('login')}
            />
          )}
          {activeForm === 'recovery' && (
            <RecoveryForm 
              onSubmit={handleRecoverySubmit}
              onSwitchToLogin={() => setActiveForm('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 