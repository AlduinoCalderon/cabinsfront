import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/config';

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

const SuccessMessage = styled.p`
  color: ${props => props.theme.successColor};
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

const RecoveryForm = ({ onRecovery, onSwitchToLogin }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await onRecovery(email);
      setSuccess(t.recovery.success);
    } catch (err) {
      setError(err.message || t.recovery.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer theme={theme}>
      <FormTitle theme={theme}>{t.recovery.title}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label theme={theme}>{t.recovery.email}</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            theme={theme}
          />
        </FormGroup>
        {error && <ErrorMessage theme={theme}>{error}</ErrorMessage>}
        {success && <SuccessMessage theme={theme}>{success}</SuccessMessage>}
        <SubmitButton
          type="submit"
          disabled={isLoading}
          theme={theme}
        >
          {isLoading ? t.recovery.loading : t.recovery.submit}
        </SubmitButton>
        <SwitchForm theme={theme}>
          {t.recovery.rememberPassword}{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            onSwitchToLogin();
          }}>
            {t.recovery.login}
          </a>
        </SwitchForm>
      </form>
    </FormContainer>
  );
};

export default RecoveryForm; 