
import React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = "system", 
  storageKey = "vite-ui-theme" 
}) => {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme={defaultTheme} 
      storageKey={storageKey}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
};

export { ThemeProvider, useTheme };
