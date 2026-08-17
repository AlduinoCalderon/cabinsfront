import React, { useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './AuthModal.css';

const RegisterForm = ({ onSubmit, onSwitchToLogin }) => {

  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('error.firstName');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('error.lastName');
    }

    if (!formData.email) {
      newErrors.email = t('error.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('error.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('error.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('error.passwordLength');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('error.passwordMatch');
    }

    if (!formData.phone) {
      newErrors.phone = t('error.phone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>{t('auth.firstName')}</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder={t('auth.firstNamePlaceholder')}
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      </div>
      <div className="form-group">
        <label>{t('auth.lastName')}</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder={t('auth.lastNamePlaceholder')}
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      </div>
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
      <div className="form-group">
        <label>{t('auth.confirmPassword')}</label>
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder={t('auth.confirmPasswordPlaceholder')}
            className={errors.confirmPassword ? 'error' : ''}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="password-toggle"
            aria-label={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
      <div className="form-group">
        <label>{t('auth.phone')}</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder={t('auth.phonePlaceholder')}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>
      {errors.general && <span className="error-message">{errors.general}</span>}
      <button
        type="submit"
        className="auth-button"
        disabled={loading}
      >
        {loading ? t('auth.loading') : t('auth.register')}
      </button>
      <div className="auth-switch">
        {t('auth.haveAccount')}{' '}
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

export default RegisterForm; 