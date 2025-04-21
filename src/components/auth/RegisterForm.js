import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthModal.css';

const RegisterForm = ({ onSubmit, onSwitchToLogin }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = t('error.email');
    }

    if (!formData.password) {
      newErrors.password = t('error.password');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = t('error.passwordLength');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('error.passwordMatch');
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('error.firstName');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('error.lastName');
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = t('error.phone');
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

      <div className="form-group">
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
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
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder={t('auth.firstNamePlaceholder')}
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder={t('auth.lastNamePlaceholder')}
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('auth.phonePlaceholder')}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <button type="submit" className="auth-button">
        {t('auth.register')}
      </button>

      <p className="auth-switch">
        {t('auth.haveAccount')}{' '}
        <button type="button" onClick={onSwitchToLogin} className="auth-switch-button">
          {t('auth.login')}
        </button>
      </p>
    </form>
  );
};

export default RegisterForm; 