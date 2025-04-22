import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import './AuthForms.css';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSwitchToRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">{t('auth.login.email')}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">{t('auth.login.password')}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="auth-button">
        {t('auth.login.submit')}
      </button>

      <div className="auth-links">
        <button type="button" className="auth-link" onClick={onForgotPassword}>
          {t('auth.login.forgot')}
        </button>
        <button type="button" className="auth-link" onClick={onSwitchToRegister}>
          {t('auth.login.noAccount')}
        </button>
      </div>
    </form>
  );
};

export default LoginForm; 