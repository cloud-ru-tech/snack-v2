export type Theme = 'light' | 'dark';
export type Brand = 'brandA' | 'brandB' | 'brandC';
export type BrandRole = 'main' | 'alter' | 'alter2' | 'alter3' | 'alter4';
export type Density = 'compact' | 'comfort' | 'spacious';
export type Language = 'en-GB' | 'ru-RU';
export type Acrylic = 'enabled' | 'disabled';

export type ThemeSyncData = {
  theme?: Theme;
  brand?: Brand;
  brandRole?: BrandRole;
  density?: Density;
  language?: Language;
};
