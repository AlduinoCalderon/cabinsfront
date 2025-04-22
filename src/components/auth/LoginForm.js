import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthModal.css';

const LoginForm = ({ onSubmit, onSwitchToRegister, onSwitchToRecovery }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await onSubmit(formData);
      } catch (err) {
        setErrors({
          ...errors,
          general: err.message || t('error.general')
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t('error.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('error.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('error.passwordRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>{t('auth.email')}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t('auth.emailPlaceholder')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>{t('auth.password')}</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder={t('auth.passwordPlaceholder')}
            className={errors.password ? 'error' : ''}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
            aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      {errors.general && <span className="error-message">{errors.general}</span>}
      <button
        type="submit"
        className="auth-button"
        disabled={loading}
      >
        {loading ? t('auth.loading') : t('auth.login')}
      </button>
      <button
        type="button"
        onClick={onSwitchToRecovery}
        className="forgot-password-button"
      >
        {t('auth.forgotPassword')}
      </button>
      <div className="auth-switch">
        {t('auth.noAccount')}{' '}
        <button
          type="button"
          className="auth-switch-button"
          onClick={onSwitchToRegister}
        >
          {t('auth.register')}
        </button>
      </div>
    </form>
  );
};

export default LoginForm; 