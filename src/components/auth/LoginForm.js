import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthModal.css';

const LoginForm = ({ onSubmit, onSwitchToRegister, onForgotPassword }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = t('error.email');
    }

    if (!formData.password) {
      newErrors.password = t('error.password');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('auth.emailPlaceholder')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
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

      <button type="submit" className="auth-button">
        {t('auth.login')}
      </button>

      <button
        type="button"
        onClick={onForgotPassword}
        className="forgot-password-button"
      >
        {t('auth.forgotPassword')}
      </button>

      <p className="auth-switch">
        {t('auth.noAccount')}{' '}
        <button type="button" onClick={onSwitchToRegister} className="auth-switch-button">
          {t('auth.register')}
        </button>
      </p>
    </form>
  );
};

export default LoginForm; 