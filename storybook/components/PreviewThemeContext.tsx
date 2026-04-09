import { createContext, type ReactNode, useContext } from 'react';

export type PreviewTheme = 'light' | 'dark';

const PreviewThemeContext = createContext<PreviewTheme>('light');

export type PreviewThemeProviderProps = {
  value: PreviewTheme;
  children: ReactNode;
};

export function PreviewThemeProvider({ value, children }: PreviewThemeProviderProps) {
  return <PreviewThemeContext.Provider value={value}>{children}</PreviewThemeContext.Provider>;
}

export function usePreviewTheme(): PreviewTheme {
  return useContext(PreviewThemeContext);
}
