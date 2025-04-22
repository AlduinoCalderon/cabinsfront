import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RecoveryForm from './RecoveryForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('login');
  const [showRecovery, setShowRecovery] = useState(false);

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowRecovery(false);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {!showRecovery ? (
          <>
            <div className="auth-modal-tabs">
              <button
                className={`auth-modal-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => handleTabChange('login')}
              >
                {t('auth.login')}
              </button>
              <button
                className={`auth-modal-tab ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => handleTabChange('register')}
              >
                {t('auth.register')}
              </button>
            </div>

            <div className="auth-modal-content">
              {activeTab === 'login' ? (
                <LoginForm onRecoveryClick={() => setShowRecovery(true)} />
              ) : (
                <RegisterForm />
              )}
            </div>
          </>
        ) : (
          <div className="auth-modal-content">
            <RecoveryForm onBack={() => setShowRecovery(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal; 