import cn from 'classnames';

type ThemeClassnames = {
  theme?: 'light' | 'dark';
  brand?: 'brandA' | 'brandB' | 'brandC';
  brandRole?: 'main' | 'alter';
  density?: 'comfort' | 'compact';
};

const DEFAULT_THEME_CLASSNAMES: Required<ThemeClassnames> = {
  brand: 'brandA',
  brandRole: 'main',
  density: 'comfort',
  theme: 'light',
};

export function getThemeClassnames(props: ThemeClassnames = {}): string {
  const { density, theme, brand, brandRole } = { ...DEFAULT_THEME_CLASSNAMES, ...props };

  return cn(
    'sn-primitive',
    'sn-base-styles',
    'sn-figmaStyles',
    'sn-components',
    `sn-${density}`,
    `sn-${theme}`,
    `sn-${brand}`,
    `sn-${brandRole}`,
    'sn-no',
  );
}
