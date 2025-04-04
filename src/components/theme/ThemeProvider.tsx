
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export interface CustomThemeProviderProps extends ThemeProviderProps {
  defaultLanguage?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "system", 
  defaultLanguage = "en",
  ...props 
}: CustomThemeProviderProps) {
  // Store the language preference in localStorage
  React.useEffect(() => {
    if (defaultLanguage) {
      localStorage.setItem("language", defaultLanguage);
    }
  }, [defaultLanguage]);

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={defaultTheme}
      enableSystem
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  )
}
