import { createContext, type ReactNode, useContext } from 'react';

import type { Theme } from './types';

export const PreviewThemeContext = createContext<Theme>('light');

export function PreviewThemeProvider({ theme, children }: { theme: Theme; children: ReactNode }) {
  return <PreviewThemeContext.Provider value={theme}>{children}</PreviewThemeContext.Provider>;
}

/** Тема тулбара Storybook; без `useGlobals` — безопасно в любом вложенном компоненте стори. */
export function usePreviewTheme(): Theme {
  return useContext(PreviewThemeContext);
}
