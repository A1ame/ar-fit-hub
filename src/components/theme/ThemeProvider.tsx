
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

interface ThemeContextType {
  language: "en" | "ru";
  setLanguage: (language: "en" | "ru") => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  language: "en",
  setLanguage: () => {},
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

  return (
    <ThemeContext.Provider value={{ language, setLanguage }}>
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
