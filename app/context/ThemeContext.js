import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    color: {
      background: isDarkMode ? "#121212" : "#ffffff",
      text: isDarkMode ? "#ffffff" : "#000000",
      textSecondary: isDarkMode ? "#aaaaaa" : "#666666",
      surface: isDarkMode ? "#1e1e1e" : "#f5f5f5",
      card: isDarkMode ? "#2d2d2d" : "#ffffff",
      primary: isDarkMode ? "#bb86fc" : "#6200ee",
      secondary: isDarkMode ? "#03dac6" : "#03dac5",
      error: isDarkMode ? "#cf6679" : "#b00020",
      success: isDarkMode ? "#4caf50" : "#2e7d32",
      warning: isDarkMode ? "#ff9800" : "#f57c00",
      border: isDarkMode ? "#404040" : "#e0e0e0",
      shadow: isDarkMode ? "#000000" : "#000000",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
