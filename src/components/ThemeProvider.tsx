
import React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

// Export the actual hook
export const useTheme = useNextTheme;

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

export default ThemeProvider;
