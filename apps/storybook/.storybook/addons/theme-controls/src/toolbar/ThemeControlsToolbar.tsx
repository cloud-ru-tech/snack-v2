import { CSSProperties, ReactNode, useCallback, useEffect, useRef } from 'react';
import { Button, IconButton, PopoverProvider, Select, TooltipLinkList } from 'storybook/internal/components';
import { addons, useGlobals } from 'storybook/manager-api';
import { useTheme } from 'storybook/theming';

import { BRAND_COLOR } from '../config/brandColors';
import { DAY_PATH, NIGHT_PATH } from '../config/svgPaths';
import {
  type Brand,
  BRAND_GROUPS,
  BRAND_OPTIONS,
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

// Три полосы с зазором по плотности: чем плотнее раскладка, тем ближе полосы.
const DENSITY_GAP: Record<Density, number> = {
  compact: 2,
  comfort: 3,
  spacious: 4,
};

function DensityIcon({ density }: { density: Density }) {
  const gap = DENSITY_GAP[density];

  return (
    <span style={iconStyle} aria-hidden>
      <svg width={iconSize} height={iconSize} viewBox='0 0 14 14' fill='currentColor' style={{ display: 'block' }}>
        {[-1, 0, 1].map(row => (
          <rect key={row} x='2' y={6 + row * (gap + 2)} width='10' height='2' rx='1' />
        ))}
      </svg>
    </span>
  );
}

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

function ChevronGlyph() {
  return (
    <svg width={8} height={8} viewBox='0 0 8 8' fill='none' stroke='currentColor' aria-hidden style={{ flexShrink: 0 }}>
      <path d='M1.5 3l2.5 2.5L6.5 3' strokeWidth={1.2} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

const brandTriggerLabelStyle: CSSProperties = { marginInline: 6, whiteSpace: 'nowrap' };

/**
 * Бренд: 14 пунктов плоским списком, поэтому семейства HR-портала и сайта
 * сгруппированы (заголовок + цвета). У `Select` из storybook групп нет — кнопка того же размера с попапом.
 */
function BrandSelect({ brand, onChange }: { brand: Brand; onChange(brand: Brand): void }) {
  const theme = useTheme();
  const current = BRAND_OPTIONS.find(option => option.value === brand);

  const groupLabelStyle: CSSProperties = {
    padding: '8px 12px 4px',
    fontSize: theme.typography.size.s1,
    fontWeight: theme.typography.weight.bold,
    color: theme.textMutedColor,
    whiteSpace: 'nowrap',
  };

  return (
    <PopoverProvider
      ariaLabel='Бренд'
      placement='bottom-start'
      padding={0}
      popover={({ onHide }) => (
        <TooltipLinkList
          links={BRAND_GROUPS.map((group, index) => [
            ...(group.label
              ? [{ id: `brand-group-${index}`, content: <div style={groupLabelStyle}>{group.label}</div> }]
              : []),
            ...group.brands.map(option => ({
              id: option.value,
              title: option.label,
              icon: <BrandColorDot color={BRAND_COLOR[option.value]} />,
              active: option.value === brand,
              onClick: () => {
                onChange(option.value);
                onHide();
              },
            })),
          ])}
        />
      )}
    >
      <Button size='small' padding='small' ariaLabel='Бренд' disableAllTooltips>
        <BrandIcon brand={brand} />
        <span style={brandTriggerLabelStyle}>{current?.label ?? brand}</span>
        <ChevronGlyph />
      </Button>
    </PopoverProvider>
  );
}

const densityOptionsWithIcons: SelectOption[] = DENSITY_OPTIONS.map(option => ({
  value: option.value,
  title: option.label,
  icon: <DensityIcon density={option.value} />,
}));

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
  layoutType?: string;
  theme?: Theme;
  brand?: Brand;
  density?: Density;
  language?: Language;
};

/**
 * Контролы темы/бренда/плотности для тулбара Storybook (стиль как у Preview background).
 */
export function ThemeControlsToolbar() {
  const [globals, updateGlobals] = useGlobals();

  const theme = (globals[GLOBAL_KEYS.THEME] as Theme) ?? 'light';
  const brand = (globals[GLOBAL_KEYS.BRAND] as Brand) ?? 'cloudConsole';
  const brandColor = (globals[GLOBAL_KEYS.BRAND_COLOR] as string) ?? '';
  const density = (globals[GLOBAL_KEYS.DENSITY] as Density) ?? 'compact';
  const language = (globals[GLOBAL_KEYS.LANGUAGE] as Language) ?? 'en-GB';

  const setTheme = useCallback((value: Theme) => updateGlobals({ [GLOBAL_KEYS.THEME]: value }), [updateGlobals]);
  const setBrand = useCallback((value: Brand) => updateGlobals({ [GLOBAL_KEYS.BRAND]: value }), [updateGlobals]);
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
      if (payload.density) next[GLOBAL_KEYS.DENSITY] = payload.density;
      if (payload.language) next[GLOBAL_KEYS.LANGUAGE] = payload.language;
      if (payload.layoutType) next.layoutType = payload.layoutType;
      if (Object.keys(next).length) updateGlobals(next);
    };
    channel.on(CHANNEL_SYNC_EVENT, handler);
    return () => channel.off(CHANNEL_SYNC_EVENT, handler);
  }, [updateGlobals]);

  return (
    <div style={wrapperStyle} role='group' aria-label='Тема, бренд, плотность'>
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
      <BrandSelect brand={brand} onChange={setBrand} />
      <BrandColorControl value={brandColor} brand={brand} onChange={setBrandColor} onReset={resetBrandColor} />
      <Select
        key={`density-${density}`}
        ariaLabel='Плотность'
        icon={<DensityIcon density={density} />}
        options={densityOptionsWithIcons}
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
