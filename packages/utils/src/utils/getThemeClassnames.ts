import cn from 'classnames';

type ThemeClassnames = {
  theme?: 'light' | 'dark';
  brand?: 'brandA' | 'brandB' | 'brandC';
  brandRole?: 'main' | 'alter' | 'alter2' | 'alter3' | 'alter4';
  density?: 'comfort' | 'compact' | 'spacious';
};

export function getThemeClassnames(props: ThemeClassnames = {}): string {
  const { density, theme, brand, brandRole } = props;

  return cn('sn-primitive', 'sn-base-styles', 'sn-figmaStyles', 'sn-components', 'sn-no', {
    [`sn-${density}`]: density,
    [`sn-${theme}`]: theme,
    [`sn-${brand}`]: brand,
    [`sn-${brandRole}`]: brandRole,
  });
}
