import { ReactNode, useMemo } from 'react';

import { ThemeValueProvider } from '../../context/themeContext';
import { useThemeConfig } from '../../hooks/useThemeConfig';

type UseThemePropsWithDefaultTheme = {
  /**
   * Объект с указанием соответсвия темы и css-класса
   */
  themeMap: Record<string, string>;
  /**
   * Значение темы по умолчанию
   */
  defaultTheme: string;
};

type UseThemeProps = {
  /**
   * Объект с указанием соответсвия темы и css-класса
   */
  themeMap: Record<string, string>;
};

export type ThemeProviderProps = {
  /**
   * Дети, которые будут обёрнуты в провайдер
   */
  children: ReactNode;
} & (UseThemePropsWithDefaultTheme | UseThemeProps);

/**
 * Провайдер, предназначенный для работы с темами
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { theme, themeClassName, changeTheme } = useThemeConfig(props);

  // Мемоизируем объект значения (createSharedContext оборачивает его в staticStore по ссылке).
  const value = useMemo(() => ({ theme, themeClassName, changeTheme }), [theme, themeClassName, changeTheme]);

  return <ThemeValueProvider value={value}>{children}</ThemeValueProvider>;
}
