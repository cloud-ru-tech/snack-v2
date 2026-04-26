import cn from 'classnames';

type ThemeClassnames = {
  theme?: 'light' | 'dark';
  brand?: 'brandA' | 'brandB';
  density?: 'comfort' | 'compact';
};

const DEFAULT_THEME_CLASSNAMES: Required<ThemeClassnames> = {
  brand: 'brandA',
  density: 'comfort',
  theme: 'light',
};

export function getThemeClassnames(props: ThemeClassnames = {}): string {
  const { density, theme, brand } = { ...DEFAULT_THEME_CLASSNAMES, ...props };

  return cn(
    'sn-primitive',
    'sn-base-styles',
    'sn-figmaStyles',
    'sn-components',
    `sn-${density}`,
    `sn-${theme}`,
    `sn-${brand}`,
    'sn-no',
  );
}
