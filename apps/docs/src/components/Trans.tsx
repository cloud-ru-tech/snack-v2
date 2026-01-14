import React, { createContext, useContext, type ReactNode } from 'react';

/**
 * Context to provide current locale to Trans components
 */
export const LocaleContext = createContext<string>('en');

/**
 * Provider component to set the current locale
 */
export const LocaleProvider: React.FC<{ locale: string; children: ReactNode }> = ({
  locale,
  children,
}) => {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
};

/**
 * Hook to get current locale
 */
export const useLocale = () => {
  return useContext(LocaleContext);
};

/**
 * Translation component for MDX documentation
 * 
 * Usage:
 * <Trans id="title" />
 * <Trans id="description" />
 * <Trans id="section.overview.text" />
 */
export const Trans: React.FC<{
  id: string;
  translations: Record<string, Record<string, string | ReactNode>>;
  defaultValue?: string;
}> = ({ id, translations, defaultValue }) => {
  const locale = useLocale();
  
  // Get translation for current locale
  const localeTranslations = translations[locale] || translations['en'] || {};
  
  // Support nested keys like "section.subsection.key"
  const keys = id.split('.');
  let value: any = localeTranslations;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      value = defaultValue || id;
      break;
    }
  }
  
  // If value is a React node, render it
  if (React.isValidElement(value)) {
    return <>{value}</>;
  }
  
  // Otherwise, render as string
  return <>{String(value)}</>;
};

/**
 * Helper component for conditional locale rendering
 * 
 * Usage:
 * <LocaleSwitch>
 *   <LocaleCase locale="en">English content</LocaleCase>
 *   <LocaleCase locale="ru">Русский контент</LocaleCase>
 * </LocaleSwitch>
 */
export const LocaleSwitch: React.FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useLocale();
  
  const childrenArray = React.Children.toArray(children);
  const matchingChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.props.locale === locale
  );
  
  return <>{matchingChild}</>;
};

export const LocaleCase: React.FC<{ locale: string; children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
