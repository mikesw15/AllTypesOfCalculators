import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'system'
  );

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let isDarkMode = false;

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
      isDarkMode = systemTheme.matches;
      
      const listener = (e: MediaQueryListEvent) => {
        if (theme === 'system') {
          root.classList.toggle('dark', e.matches);
          setIsDark(e.matches);
        }
      };
      systemTheme.addEventListener('change', listener);
      root.classList.add(isDarkMode ? 'dark' : 'light');
      setIsDark(isDarkMode);
      return () => systemTheme.removeEventListener('change', listener);
    } else {
      root.classList.add(theme);
      isDarkMode = theme === 'dark';
      setIsDark(isDarkMode);
    }
  }, [theme]);

  // Keep body bg color aligned for overscroll areas
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#111827' : '#f9fafb';
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
