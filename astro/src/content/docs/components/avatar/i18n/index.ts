// JSON translations - imported dynamically
// Type definitions can be kept here if needed for TypeScript support
import enTranslations from './en.json';
import ruTranslations from './ru.json';

export type AvatarTranslations = typeof enTranslations;

export const translations = {
  en: enTranslations,
  ru: ruTranslations,
};
