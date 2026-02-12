export type Theme = 'light' | 'dark';
export type Brand = 'brandA' | 'brandB';
export type Platform = 'desktop' | 'mobile';
export type Acrylic = 'enabled' | 'disabled';

export type ThemeSyncData = {
  theme?: Theme;
  brand?: Brand;
  platform?: Platform;
  acrylic?: Acrylic;
};
