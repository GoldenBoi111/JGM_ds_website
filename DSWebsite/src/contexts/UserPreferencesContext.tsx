import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  fontSize: 'small' | 'normal' | 'large';
  reducedMotion: boolean;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreference: (key: keyof UserPreferences, value: any) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

// Default preferences
const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: true,
  fontSize: 'normal',
  reducedMotion: false,
};

export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse user preferences', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Apply font size to document
    document.documentElement.style.fontSize = 
      preferences.fontSize === 'small' ? '14px' : 
      preferences.fontSize === 'large' ? '18px' : '16px';
    
    // Apply reduced motion preference
    if (preferences.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--animation-iteration-count', '1');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.style.removeProperty('--animation-iteration-count');
    }
  }, [preferences]);

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};