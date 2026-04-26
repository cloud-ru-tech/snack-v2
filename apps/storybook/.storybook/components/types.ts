export type Theme = 'light' | 'dark';
export type Brand = 'brandA' | 'brandB';
export type Density = 'compact' | 'comfort';
export type Language = 'en-GB' | 'ru-RU';
export type Acrylic = 'enabled' | 'disabled';

export type ThemeSyncData = {
  theme?: Theme;
  brand?: Brand;
  density?: Density;
  language?: Language;
};
