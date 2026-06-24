import { createSharedContext, providerKey } from '@ds/context-kit';

export type ThemeContextType = {
  theme: string | undefined;
  themeClassName: string | undefined;
  changeTheme: ((theme: string) => void) | undefined;
};

// Общий контекст темы через @ds/context-kit (Symbol.for-синглтон, SSR-safe). `ThemeValueProvider`
// внутренний — публично доступны `ThemeProvider` (обёртка) и `useThemeContext`.
export const { Provider: ThemeValueProvider, useValue: useThemeContext } = createSharedContext<ThemeContextType>({
  key: providerKey('theme', 1),
  defaultValue: {
    theme: undefined,
    themeClassName: undefined,
    changeTheme: undefined,
  },
});
