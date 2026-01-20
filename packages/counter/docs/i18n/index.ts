// JSON translations - imported dynamically
// Type definitions can be kept here if needed for TypeScript support
export type CounterTranslations = typeof import('./en.json');

export const translations = {
  en: require('./en.json'),
  ru: require('./ru.json'),
};
