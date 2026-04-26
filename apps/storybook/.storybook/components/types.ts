export type Theme = 'light' | 'dark';
export type Brand = 'brandA' | 'brandB';
export type Platform = 'desktop' | 'mobile';
export type Language = 'en-GB' | 'ru-RU';

export type ThemeSyncData = {
  theme?: Theme;
  brand?: Brand;
  platform?: Platform;
  language?: Language;
};
