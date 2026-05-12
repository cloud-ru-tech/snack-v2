export type Theme = 'light' | 'dark';
export type Brand = 'brandA' | 'brandB' | 'brandC';
export type BrandRole = 'main' | 'alter';
export type Density = 'compact' | 'comfort';
export type Language = 'en-GB' | 'ru-RU';
export type Acrylic = 'enabled' | 'disabled';

export type ThemeSyncData = {
  theme?: Theme;
  brand?: Brand;
  brandRole?: BrandRole;
  density?: Density;
  language?: Language;
};
