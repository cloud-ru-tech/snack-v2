import React, { useCallback, useEffect } from 'react';
import { Select } from 'storybook/internal/components';
import { addons, useGlobals } from 'storybook/manager-api';

import { BRAND_COLOR } from '../config/brandColors';
import { DAY_PATH, LAPTOP_PATH, MOBILE_PHONE_PATH, NIGHT_PATH } from '../config/svgPaths';
import {
  Brand,
  BRAND_OPTIONS,
  CHANNEL_SYNC_EVENT,
  GLOBAL_KEYS,
  Platform,
  PLATFORM_OPTIONS,
  Theme,
  THEME_OPTIONS,
} from '../constants';

type SelectOption = { value: string; title: string; icon: React.ReactNode };

const iconSize = 14;
const iconStyle: React.CSSProperties = { width: iconSize, height: iconSize, flexShrink: 0, display: 'block' };

function SvgIcon({ d }: { d: string }) {
  return (
    <svg width={iconSize} height={iconSize} viewBox='0 0 24 24' fill='currentColor' style={iconStyle} aria-hidden>
      <path d={d} fillRule='evenodd' />
    </svg>
  );
}

function BrandColorDot({ color }: { color: string }) {
  return (
    <span style={iconStyle} aria-hidden>
      <svg width={iconSize} height={iconSize} viewBox='0 0 14 14' fill='none' style={{ display: 'block' }}>
        <circle cx='7' cy='7' r='5' fill={color} />
      </svg>
    </span>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return <SvgIcon d={theme === 'dark' ? NIGHT_PATH : DAY_PATH} />;
}

function BrandIcon({ brand }: { brand: Brand }) {
  return <BrandColorDot color={BRAND_COLOR[brand]} />;
}

function PlatformIcon({ platform }: { platform: Platform }) {
  return <SvgIcon d={platform === 'mobile' ? MOBILE_PHONE_PATH : LAPTOP_PATH} />;
}

const themeOptionsWithIcons: SelectOption[] = [
  { value: 'light', title: THEME_OPTIONS[0].label, icon: <SvgIcon d={DAY_PATH} /> },
  { value: 'dark', title: THEME_OPTIONS[1].label, icon: <SvgIcon d={NIGHT_PATH} /> },
];

const brandOptionsWithIcons: SelectOption[] = [
  { value: 'brandA', title: BRAND_OPTIONS[0].label, icon: <BrandColorDot color={BRAND_COLOR.brandA} /> },
  { value: 'brandB', title: BRAND_OPTIONS[1].label, icon: <BrandColorDot color={BRAND_COLOR.brandB} /> },
];

const platformOptionsWithIcons: SelectOption[] = [
  { value: 'desktop', title: PLATFORM_OPTIONS[0].label, icon: <SvgIcon d={LAPTOP_PATH} /> },
  { value: 'mobile', title: PLATFORM_OPTIONS[1].label, icon: <SvgIcon d={MOBILE_PHONE_PATH} /> },
];

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: '100%',
};

/**
 * Контролы темы/бренда/платформы для тулбара Storybook (стиль как у Preview background).
 */
export function ThemeControlsToolbar() {
  const [globals, updateGlobals] = useGlobals();

  const theme = (globals[GLOBAL_KEYS.THEME] as Theme) ?? 'light';
  const brand = (globals[GLOBAL_KEYS.BRAND] as Brand) ?? 'brandA';
  const platform = (globals[GLOBAL_KEYS.PLATFORM] as Platform) ?? 'desktop';

  const setTheme = useCallback((value: Theme) => updateGlobals({ [GLOBAL_KEYS.THEME]: value }), [updateGlobals]);
  const setBrand = useCallback((value: Brand) => updateGlobals({ [GLOBAL_KEYS.BRAND]: value }), [updateGlobals]);
  const setPlatform = useCallback(
    (value: Platform) => updateGlobals({ [GLOBAL_KEYS.PLATFORM]: value }),
    [updateGlobals],
  );

  useEffect(() => {
    const channel = addons.getChannel();
    const handler = (payload: { theme?: Theme; brand?: Brand; platform?: Platform }) => {
      const next: Record<string, string> = {};
      if (payload.theme) next[GLOBAL_KEYS.THEME] = payload.theme;
      if (payload.brand) next[GLOBAL_KEYS.BRAND] = payload.brand;
      if (payload.platform) next[GLOBAL_KEYS.PLATFORM] = payload.platform;
      if (Object.keys(next).length) updateGlobals(next);
    };
    channel.on(CHANNEL_SYNC_EVENT, handler);
    return () => channel.off(CHANNEL_SYNC_EVENT, handler);
  }, [updateGlobals]);

  return (
    <div style={wrapperStyle} role='group' aria-label='Тема, бренд, платформа'>
      <Select
        key={`theme-${theme}`}
        ariaLabel='Тема'
        icon={<ThemeIcon theme={theme} />}
        options={themeOptionsWithIcons}
        defaultOptions={theme}
        onSelect={v => setTheme(String(v) as Theme)}
        size='small'
        padding='small'
      />
      <Select
        key={`brand-${brand}`}
        ariaLabel='Бренд'
        icon={<BrandIcon brand={brand} />}
        options={brandOptionsWithIcons}
        defaultOptions={brand}
        onSelect={v => setBrand(String(v) as Brand)}
        size='small'
        padding='small'
      />
      <Select
        key={`platform-${platform}`}
        ariaLabel='Платформа'
        icon={<PlatformIcon platform={platform} />}
        options={platformOptionsWithIcons}
        defaultOptions={platform}
        onSelect={v => setPlatform(String(v) as Platform)}
        size='small'
        padding='small'
      />
    </div>
  );
}
