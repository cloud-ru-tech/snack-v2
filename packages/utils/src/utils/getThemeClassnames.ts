import cn from 'classnames';

type ThemeClassnames = {
  theme?: 'light' | 'dark';
  brand?: 'brandA' | 'brandB';
  platform?: 'desktop' | 'mobile';
};

const DEFAULT_THEME_CLASSNAMES = {
  brand: 'brandA',
  platform: 'desktop',
  theme: 'light',
};

export function getThemeClassnames(props: ThemeClassnames = {}) {
  const { platform, theme, brand } = { ...DEFAULT_THEME_CLASSNAMES, ...props };

  return cn(
    'sn-primitive',
    'sn-base-styles',
    'sn-figmaStyles',
    'sn-components',
    `sn-${platform}`,
    `sn-${theme}`,
    `sn-${brand}`,
    `sn-no`, // Acrylic, temporarily disabled (acrylic === 'enabled' ? 'sn-yes' : 'sn-no')
  );
}
