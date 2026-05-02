import React, { createContext, useContext, ReactNode } from 'react';
import lightTheme, { Theme } from './tokens';

const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider = ({
  theme = lightTheme,
  children,
}: {
  theme?: Theme;
  children: ReactNode;
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;

export const useTheme = (): Theme => useContext(ThemeContext);
