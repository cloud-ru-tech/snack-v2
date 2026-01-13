// JSON translations - imported dynamically
// Type definitions can be kept here if needed for TypeScript support
export type AvatarTranslations = typeof import('./en.json');

export const translations = {
  en: require('./en.json'),
  ru: require('./ru.json'),
};
