import { CSSProperties, ReactNode, useCallback, useEffect, useRef } from 'react';
import { Button, IconButton, Select } from 'storybook/internal/components';
import { addons, useGlobals } from 'storybook/manager-api';

import { BRAND_COLOR } from '../config/brandColors';
import { DAY_PATH, LAPTOP_PATH, MOBILE_PHONE_PATH, NIGHT_PATH } from '../config/svgPaths';
import {
  type Brand,
  BRAND_OPTIONS,
  BRAND_ROLE_OPTIONS,
  type BrandRole,
  CHANNEL_SYNC_EVENT,
  type Density,
  DENSITY_OPTIONS,
  GLOBAL_KEYS,
  type Language,
  LANGUAGE_OPTIONS,
  type Theme,
  THEME_OPTIONS,
} from '../constants';

type SelectOption = { value: string; title: string; icon: ReactNode };

const iconSize = 14;
const iconStyle: CSSProperties = { width: iconSize, height: iconSize, flexShrink: 0, display: 'block' };

function SvgIcon({ d }: { d: string }) {
  return (
    <svg width={iconSize} height={iconSize} viewBox='0 0 24 24' fill='currentColor' style={iconStyle} aria-hidden>
      <path d={d} fillRule='evenodd' />
    </svg>
  );
}

// Подпись бренд-цвета в тулбарной кнопке: в одну строку рядом со свотчем, шрифт наследуется от тулбара.
const brandColorLabelStyle: CSSProperties = { marginInlineStart: 6, whiteSpace: 'nowrap' };

function BrandColorDot({ color }: { color: string }) {
  return (
    <span style={iconStyle} aria-hidden>
      <svg width={iconSize} height={iconSize} viewBox='0 0 14 14' fill='none' style={{ display: 'block' }}>
        <circle cx='7' cy='7' r='5' fill={color} />
      </svg>
    </span>
  );
}

const LANGUAGE_TO_EMOJI_MAP: Record<Language, string> = {
  'en-GB': '🇬🇧',
  'ru-RU': '🇷🇺',
  cimode: '🔑',
};

function ThemeIcon({ theme }: { theme: Theme }) {
  return <SvgIcon d={theme === 'dark' ? NIGHT_PATH : DAY_PATH} />;
}

function BrandIcon({ brand }: { brand: Brand }) {
  return <BrandColorDot color={BRAND_COLOR[brand]} />;
}

function BrandRoleIcon({ variant }: { variant: BrandRole }) {
  return (
    <span style={iconStyle} aria-hidden>
      <svg width={iconSize} height={iconSize} viewBox='0 0 14 14' fill='none' style={{ display: 'block' }}>
        <circle cx='7' cy='7' r='5' fill='none' stroke='currentColor' strokeWidth={variant === 'main' ? 2.5 : 1} />
      </svg>
    </span>
  );
}

function PlatformIcon({ density }: { density: Density }) {
  return <SvgIcon d={density === 'comfort' ? MOBILE_PHONE_PATH : LAPTOP_PATH} />;
}

const DENSITY_TO_PATH: Record<Density, string> = {
  compact: LAPTOP_PATH,
  comfort: MOBILE_PHONE_PATH,
  spacious: LAPTOP_PATH,
};

function LanguageIcon({ language }: { language: Language }) {
  return <span aria-hidden>{LANGUAGE_TO_EMOJI_MAP[language]}</span>;
}

const brandColorControlStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',
};

// Relative-бокс: якорь для скрытого color-input, растянутого на всю кнопку (см. hiddenColorInputStyle).
const brandColorTriggerStyle: CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',
};

// Нативный color input прячем визуально, но растягиваем на весь trigger-бокс (inset:0), чтобы браузер
// открывал color-picker ровно под кнопкой. Клик по кнопке программно дёргает input по ref; сам input
// pointer-events:none, поэтому клики уходят кнопке.
const hiddenColorInputStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  border: 'none',
  opacity: 0,
  pointerEvents: 'none',
};

function ResetGlyph() {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      style={iconStyle}
      aria-hidden
    >
      <path d='M6 6l12 12M18 6L6 18' strokeWidth={2} strokeLinecap='round' />
    </svg>
  );
}

/**
 * Кастомный бренд-цвет (white-label): круглый swatch внутри тулбарной кнопки задаёт seed-цвет, который
 * через глобал уходит в `brandColor` корневого `RootThemeProvider` и перекрашивает акцент во всех стори.
 * Пока цвет не задан, swatch показывает цвет текущего бренда; активная кнопка + крестик рядом — сброс.
 */
function BrandColorControl({
  value,
  brand,
  onChange,
  onReset,
}: {
  value: string;
  brand: Brand;
  onChange(color: string): void;
  onReset(): void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const swatch = value || BRAND_COLOR[brand];

  return (
    <span style={brandColorControlStyle}>
      {/* Кнопка и скрытый input лежат в одном relative-боксе, input растянут на всю кнопку (inset:0).
          Нативный color-picker якорится к боксу input'а, поэтому открывается ровно под кнопкой,
          а не в левом-верхнем углу строки. */}
      <span style={brandColorTriggerStyle}>
        {/* Тот же `Button`, что под соседними `Select` (size/padding='small') — кнопка с иконкой и текстом,
            а не голая точка с нативным title-тултипом. Клик открывает нативный color-input. */}
        <Button
          size='small'
          padding='small'
          active={Boolean(value)}
          tooltip={value ? `Кастомный бренд-цвет: ${value}` : 'Задать кастомный бренд-цвет (white-label)'}
          onClick={() => inputRef.current?.click()}
        >
          <BrandColorDot color={swatch} />
          <span style={brandColorLabelStyle}>{value || 'Бренд-цвет'}</span>
        </Button>
        <input
          ref={inputRef}
          type='color'
          aria-label='Кастомный бренд-цвет'
          value={swatch}
          onChange={event => onChange(event.target.value)}
          style={hiddenColorInputStyle}
          tabIndex={-1}
        />
      </span>
      {value ? (
        <IconButton size='small' title='Сбросить кастомный бренд-цвет' onClick={onReset}>
          <ResetGlyph />
        </IconButton>
      ) : null}
    </span>
  );
}

const themeOptionsWithIcons: SelectOption[] = [
  { value: 'light', title: THEME_OPTIONS[0].label, icon: <SvgIcon d={DAY_PATH} /> },
  { value: 'dark', title: THEME_OPTIONS[1].label, icon: <SvgIcon d={NIGHT_PATH} /> },
];

const brandOptionsWithIcons: SelectOption[] = [
  { value: 'brandA', title: BRAND_OPTIONS[0].label, icon: <BrandColorDot color={BRAND_COLOR.brandA} /> },
  { value: 'brandB', title: BRAND_OPTIONS[1].label, icon: <BrandColorDot color={BRAND_COLOR.brandB} /> },
  { value: 'brandC', title: BRAND_OPTIONS[2].label, icon: <BrandColorDot color={BRAND_COLOR.brandC} /> },
];

const brandRoleOptionsWithIcons: SelectOption[] = [
  { value: 'main', title: BRAND_ROLE_OPTIONS[0].label, icon: <BrandRoleIcon variant='main' /> },
  { value: 'alter', title: BRAND_ROLE_OPTIONS[1].label, icon: <BrandRoleIcon variant='alter' /> },
  { value: 'alter2', title: BRAND_ROLE_OPTIONS[2].label, icon: <BrandRoleIcon variant='alter2' /> },
  { value: 'alter3', title: BRAND_ROLE_OPTIONS[3].label, icon: <BrandRoleIcon variant='alter3' /> },
  { value: 'alter4', title: BRAND_ROLE_OPTIONS[4].label, icon: <BrandRoleIcon variant='alter4' /> },
];

const platformOptionsWithIcons: SelectOption[] = [
  { value: 'compact', title: DENSITY_OPTIONS[0].label, icon: <SvgIcon d={DENSITY_TO_PATH.compact} /> },
  { value: 'comfort', title: DENSITY_OPTIONS[1].label, icon: <SvgIcon d={DENSITY_TO_PATH.comfort} /> },
  { value: 'spacious', title: DENSITY_OPTIONS[2].label, icon: <SvgIcon d={DENSITY_TO_PATH.spacious} /> },
];

const languageOptionsWithIcons: SelectOption[] = LANGUAGE_OPTIONS.map(option => ({
  value: option.value,
  title: option.label,
  icon: <LanguageIcon language={option.value} />,
}));

const wrapperStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: '100%',
};

type ControlsPayload = {
  theme?: Theme;
  brand?: Brand;
  brandRole?: BrandRole;
  density?: Density;
  language?: Language;
};

/**
 * Контролы темы/бренда/платформы для тулбара Storybook (стиль как у Preview background).
 */
export function ThemeControlsToolbar() {
  const [globals, updateGlobals] = useGlobals();

  const theme = (globals[GLOBAL_KEYS.THEME] as Theme) ?? 'light';
  const brand = (globals[GLOBAL_KEYS.BRAND] as Brand) ?? 'brandA';
  const brandRole = (globals[GLOBAL_KEYS.BRAND_ROLE] as BrandRole) ?? 'main';
  const brandColor = (globals[GLOBAL_KEYS.BRAND_COLOR] as string) ?? '';
  const density = (globals[GLOBAL_KEYS.DENSITY] as Density) ?? 'compact';
  const language = (globals[GLOBAL_KEYS.LANGUAGE] as Language) ?? 'en-GB';

  const setTheme = useCallback((value: Theme) => updateGlobals({ [GLOBAL_KEYS.THEME]: value }), [updateGlobals]);
  const setBrand = useCallback((value: Brand) => updateGlobals({ [GLOBAL_KEYS.BRAND]: value }), [updateGlobals]);
  const setBrandRole = useCallback(
    (value: BrandRole) => updateGlobals({ [GLOBAL_KEYS.BRAND_ROLE]: value }),
    [updateGlobals],
  );
  const setBrandColor = useCallback(
    (value: string) => updateGlobals({ [GLOBAL_KEYS.BRAND_COLOR]: value }),
    [updateGlobals],
  );
  const resetBrandColor = useCallback(() => updateGlobals({ [GLOBAL_KEYS.BRAND_COLOR]: '' }), [updateGlobals]);
  const setDensity = useCallback((value: Density) => updateGlobals({ [GLOBAL_KEYS.DENSITY]: value }), [updateGlobals]);
  const setLanguage = useCallback(
    (language: Language) => updateGlobals({ [GLOBAL_KEYS.LANGUAGE]: language }),
    [updateGlobals],
  );

  useEffect(() => {
    const channel = addons.getChannel();
    const handler = (payload: ControlsPayload) => {
      const next: Record<string, string> = {};
      if (payload.theme) next[GLOBAL_KEYS.THEME] = payload.theme;
      if (payload.brand) next[GLOBAL_KEYS.BRAND] = payload.brand;
      if (payload.brandRole) next[GLOBAL_KEYS.BRAND_ROLE] = payload.brandRole;
      if (payload.density) next[GLOBAL_KEYS.DENSITY] = payload.density;
      if (payload.language) next[GLOBAL_KEYS.LANGUAGE] = payload.language;
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
      <BrandColorControl value={brandColor} brand={brand} onChange={setBrandColor} onReset={resetBrandColor} />
      <Select
        key={`brandRole-${brandRole}`}
        ariaLabel='Brand role'
        icon={<BrandRoleIcon variant={brandRole} />}
        options={brandRoleOptionsWithIcons}
        defaultOptions={brandRole}
        onSelect={v => setBrandRole(String(v) as BrandRole)}
        size='small'
        padding='small'
      />
      <Select
        key={`platform-${density}`}
        ariaLabel='Платформа'
        icon={<PlatformIcon density={density} />}
        options={platformOptionsWithIcons}
        defaultOptions={density}
        onSelect={v => setDensity(String(v) as Density)}
        size='small'
        padding='small'
      />
      <Select
        key={`language-${language}`}
        ariaLabel='Язык'
        icon={<LanguageIcon language={language} />}
        options={languageOptionsWithIcons}
        defaultOptions={language}
        onSelect={v => setLanguage(String(v) as Language)}
        size='small'
        padding='small'
      />
    </div>
  );
}
