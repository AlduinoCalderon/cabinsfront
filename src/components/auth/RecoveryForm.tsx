import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import './AuthForms.css';

interface RecoveryFormProps {
  onSubmit: (email: string) => void;
  onSwitchToLogin: () => void;
}

const RecoveryForm: React.FC<RecoveryFormProps> = ({ onSubmit, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">{t('auth.recovery.email')}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="auth-button">
        {t('auth.recovery.submit')}
      </button>

      <div className="auth-links">
        <button type="button" className="auth-link" onClick={onSwitchToLogin}>
          {t('auth.recovery.back')}
        </button>
      </div>
    </form>
  );
};

export default RecoveryForm; 