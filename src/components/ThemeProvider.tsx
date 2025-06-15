
import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Re-export useTheme from next-themes so it can be used consistently across the app.
export { useTheme } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

// Change to a named export to match the import in App.tsx
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
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
