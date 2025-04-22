import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthModal.css';

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

const ForgotPassword = styled.a`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.primaryColor};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
`;

const LoginForm = ({ onLogin, onSwitchToRegister, onSwitchToRecovery }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onLogin(formData);
    } catch (err) {
      setError(err.message || t.login.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer theme={theme}>
      <FormTitle theme={theme}>{t.login.title}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label theme={theme}>{t.login.email}</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            theme={theme}
          />
        </FormGroup>
        <FormGroup>
          <Label theme={theme}>{t.login.password}</Label>
          <div className="password-input-container">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              theme={theme}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              aria-label={showPassword ? t.login.hidePassword : t.login.showPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </FormGroup>
        {error && <ErrorMessage theme={theme}>{error}</ErrorMessage>}
        <SubmitButton
          type="submit"
          disabled={isLoading}
          theme={theme}
        >
          {isLoading ? t.login.loading : t.login.submit}
        </SubmitButton>
        <ForgotPassword
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToRecovery();
          }}
          theme={theme}
        >
          {t.login.forgotPassword}
        </ForgotPassword>
      </form>
    </FormContainer>
  );
};

export default LoginForm; 