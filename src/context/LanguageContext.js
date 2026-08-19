import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  
  const getBaseLang = (lang) => {
    if (!lang) return 'es';
    const base = lang.split('-')[0];
    return base === 'en' ? 'en' : 'es';
  };

  const [language, setLanguage] = useState(getBaseLang(i18n.language));

  useEffect(() => {
    setLanguage(getBaseLang(i18n.language));
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 