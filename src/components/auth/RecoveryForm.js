import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './AuthModal.css';

const RecoveryForm = ({ onSubmit, onSwitchToLogin }) => {

  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError(t('error.emailRequired'));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('error.emailInvalid'));
      return;
    }

    setLoading(true);
    try {
      await onSubmit(email);
      setSuccess(t('auth.recoverySuccess'));
    } catch (err) {
      setError(err.message || t('error.general'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>{t('auth.email')}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={t('auth.emailPlaceholder')}
          className={error ? 'error' : ''}
        />
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
      </div>
      <button
        type="submit"
        className="auth-button"
        disabled={loading}
      >
        {loading ? t('auth.loading') : t('auth.recoveryButton')}
      </button>
      <div className="auth-switch">
        {t('auth.rememberPassword')}{' '}
        <button
          type="button"
          className="auth-switch-button"
          onClick={onSwitchToLogin}
        >
          {t('auth.login')}
        </button>
      </div>
    </form>
  );
};

export default RecoveryForm; 