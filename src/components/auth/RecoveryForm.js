import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AuthModal.css';

const RecoveryForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(t('error.email'));
      return;
    }
    setError('');
    // Implementar lógica de recuperación
    console.log('Enviando email de recuperación a:', email);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <p className="recovery-description">{t('auth.recoveryInstructions')}</p>
      <div className="form-group">
        <label htmlFor="recovery-email">{t('auth.email')}</label>
        <input
          type="email"
          id="recovery-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={error ? 'error' : ''}
          placeholder={t('auth.emailPlaceholder')}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
      <button type="submit" className="auth-button">
        {t('auth.sendRecoveryLink')}
      </button>
      <button type="button" onClick={onSwitchToLogin} className="auth-button secondary">
        {t('auth.backToLogin')}
      </button>
    </form>
  );
};

export default RecoveryForm; 