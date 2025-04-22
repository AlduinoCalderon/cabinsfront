import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/config';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthModal.css';
import { useTranslation } from 'react-i18next';

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${props => props.theme.cardBg};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const FormTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.titleColor};
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textColor};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 5px;
  background-color: ${props => props.theme.inputBg};
  color: ${props => props.theme.textColor};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primaryColor};
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }

  &:disabled {
    background-color: ${props => props.theme.disabledColor};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.errorColor};
  margin-top: 1rem;
  text-align: center;
`;

const SwitchForm = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.textColor};
  
  a {
    color: ${props => props.theme.primaryColor};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.secondaryColor};
    }
  }
`;

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const { register } = useAuth();
  const { t: i18nextT } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
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
    // Clear error when user starts typing
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
        await register(formData.name, formData.email, formData.password);
      } catch (err) {
        setErrors({
          ...errors,
          general: err.message || i18nextT('error.general')
        });
      } finally {
        setLoading(false);
      }
    }
  };

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
      newErrors.email = i18nextT('error.email');
    }

    if (!formData.password) {
      newErrors.password = i18nextT('error.password');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = i18nextT('error.passwordLength');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = i18nextT('error.passwordMatch');
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = i18nextT('error.firstName');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = i18nextT('error.lastName');
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = i18nextT('error.phone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormContainer theme={theme}>
      <FormTitle theme={theme}>{t.register.title}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label theme={theme}>{t.register.name}</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            theme={theme}
          />
        </FormGroup>
        <FormGroup>
          <Label theme={theme}>{t.register.email}</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={i18nextT('auth.emailPlaceholder')}
            className={errors.email ? 'error' : ''}
            theme={theme}
          />
          {errors.email && <ErrorMessage theme={theme}>{errors.email}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label theme={theme}>{t.register.password}</Label>
          <div className="password-input-container">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={i18nextT('auth.passwordPlaceholder')}
              className={errors.password ? 'error' : ''}
              theme={theme}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              aria-label={showPassword ? i18nextT('auth.hidePassword') : i18nextT('auth.showPassword')}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <ErrorMessage theme={theme}>{errors.password}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label theme={theme}>{t.register.confirmPassword}</Label>
          <div className="password-input-container">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder={i18nextT('auth.confirmPasswordPlaceholder')}
              className={errors.confirmPassword ? 'error' : ''}
              theme={theme}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="password-toggle"
              aria-label={showConfirmPassword ? i18nextT('auth.hidePassword') : i18nextT('auth.showPassword')}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <ErrorMessage theme={theme}>{errors.confirmPassword}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label theme={theme}>{t.register.firstName}</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder={i18nextT('auth.firstNamePlaceholder')}
            className={errors.firstName ? 'error' : ''}
            theme={theme}
          />
          {errors.firstName && <ErrorMessage theme={theme}>{errors.firstName}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label theme={theme}>{t.register.lastName}</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder={i18nextT('auth.lastNamePlaceholder')}
            className={errors.lastName ? 'error' : ''}
            theme={theme}
          />
          {errors.lastName && <ErrorMessage theme={theme}>{errors.lastName}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label theme={theme}>{t.register.phone}</Label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={i18nextT('auth.phonePlaceholder')}
            className={errors.phone ? 'error' : ''}
            theme={theme}
          />
          {errors.phone && <ErrorMessage theme={theme}>{errors.phone}</ErrorMessage>}
        </FormGroup>
        {errors.general && <ErrorMessage theme={theme}>{errors.general}</ErrorMessage>}
        <SubmitButton
          type="submit"
          disabled={loading}
          theme={theme}
        >
          {loading ? t.register.loading : t.register.submit}
        </SubmitButton>
        <SwitchForm theme={theme}>
          {i18nextT('auth.haveAccount')}{' '}
          <button type="button" onClick={onSwitchToLogin} className="auth-switch-button">
            {i18nextT('auth.login')}
          </button>
        </SwitchForm>
      </form>
    </FormContainer>
  );
};

export default RegisterForm; 