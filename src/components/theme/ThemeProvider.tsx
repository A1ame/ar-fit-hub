
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

interface ThemeContextType {
  language: "en" | "ru";
  setLanguage: (language: "en" | "ru") => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  language: "en",
  setLanguage: () => {},
  theme: "system",
  setTheme: () => {}
});

export const useTheme = () => React.useContext(ThemeContext);

export interface CustomThemeProviderProps extends ThemeProviderProps {
  defaultLanguage?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "system", 
  defaultLanguage = "en",
  ...props 
}: CustomThemeProviderProps) {
  const [language, setLanguage] = React.useState<"en" | "ru">(
    defaultLanguage === "ru" ? "ru" : "en"
  );
  const [theme, setTheme] = React.useState(defaultTheme);

  // Store the language preference in localStorage
  React.useEffect(() => {
    if (language) {
      localStorage.setItem("language", language);
    }
  }, [language]);

  // Read language from localStorage on mount
  React.useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage === "en" || storedLanguage === "ru") {
      setLanguage(storedLanguage);
    }
  }, []);

  // Update theme in localStorage
  const handleThemeChange = React.useCallback((newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Initialize theme from localStorage on mount
  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      handleThemeChange(storedTheme);
    }
  }, [handleThemeChange]);

  return (
    <ThemeContext.Provider value={{ 
      language, 
      setLanguage, 
      theme, 
      setTheme: handleThemeChange 
    }}>
      <NextThemesProvider
        {...props}
        defaultTheme={defaultTheme}
        enableSystem
        attribute="class"
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}
