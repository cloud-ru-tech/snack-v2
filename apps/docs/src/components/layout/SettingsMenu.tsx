import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { LaptopSVG, MobilePhoneSVG } from '@ds/icons/interface/product';
import { DaySVG, NightSVG, SettingsSVG } from '@ds/icons/interface/system';
import { PortalContextProvider } from '@ds/portal-context';
import { type Segment, SegmentControl } from '@ds/segment-control';
import { BRAND, COLOR_SCHEME, DENSITY, getGlobalThemeStore, PLATFORM, useThemeAppearance } from '@ds/theme';
import { useEffect, useRef, useState } from 'react';

import { ensureThemeStore, setThemeAppearance } from '../../lib/themeStore';
import { DocsChromeScope } from './DocsChromeScope';
import styles from './SettingsMenu.module.scss';

// Стор оформления инициализируется из localStorage до первого рендера компонента.
ensureThemeStore();

// Оси выводятся из рантайм-констант @ds/theme: value-импорт hydration-safe в Astro,
// в отличие от type-импорта (см. docs-dev-type-import-gotcha).
type Theme = (typeof COLOR_SCHEME)[keyof typeof COLOR_SCHEME];
type Brand = (typeof BRAND)[keyof typeof BRAND];
type Density = (typeof DENSITY)[keyof typeof DENSITY];
type Platform = (typeof PLATFORM)[keyof typeof PLATFORM];

type AppearancePatch = Parameters<ReturnType<typeof getGlobalThemeStore>['setAppearance']>[0];

const THEME_ITEMS: Segment<Theme>[] = [
  { value: 'light', label: 'Light', icon: <DaySVG />, iconPosition: 'before' },
  { value: 'dark', label: 'Dark', icon: <NightSVG />, iconPosition: 'before' },
];

// Бренд в @ds/theme — плоский список; в меню он разложен на семейство и цвет: у HR-портала и сайта
// по пять цветовых вариантов, остальные бренды самостоятельные.
type BrandFamily = 'cloudConsole' | 'giga-id' | 'gitverse' | 'snackUI' | 'hr' | 'site';

const BRAND_COLORS = ['Blue', 'Graphite', 'Green', 'Purple', 'Yellow'] as const;
type BrandColor = (typeof BRAND_COLORS)[number];

const DEFAULT_BRAND: Brand = BRAND.CloudConsole;

const BRAND_FAMILY_ITEMS: Segment<BrandFamily>[] = [
  { value: 'cloudConsole', label: 'Console' },
  { value: 'giga-id', label: 'Giga ID' },
  { value: 'gitverse', label: 'GitVerse' },
  { value: 'snackUI', label: 'Snack' },
  { value: 'hr', label: 'HR' },
  { value: 'site', label: 'Site' },
];

const BRAND_COLOR_ITEMS: Segment<BrandColor>[] = BRAND_COLORS.map(color => ({ value: color, label: color }));

function isColoredFamily(family: BrandFamily): family is 'hr' | 'site' {
  return family === 'hr' || family === 'site';
}

function parseBrand(brand: Brand): { family: BrandFamily; color: BrandColor } {
  const colored = BRAND_COLORS.find(color => brand.endsWith(color));
  if (colored) {
    return { family: brand.startsWith('hr') ? 'hr' : 'site', color: colored };
  }
  return { family: brand as BrandFamily, color: BRAND_COLORS[0] };
}

function composeBrand(family: BrandFamily, color: BrandColor): Brand {
  return (isColoredFamily(family) ? `${family}${color}` : family) as Brand;
}

const PLATFORM_ITEMS: Segment<Platform>[] = [
  { value: 'webDesktop', label: 'Desktop', icon: <LaptopSVG />, iconPosition: 'before' },
  { value: 'webMobile', label: 'Mobile', icon: <MobilePhoneSVG />, iconPosition: 'before' },
];

const DENSITY_ITEMS: Segment<Density>[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfort', label: 'Comfort' },
  { value: 'spacious', label: 'Spacious' },
];

type SyncPayload = {
  type: 'theme-sync';
  theme: Theme;
  brand: Brand;
  density: Density;
  layoutType: 'desktop' | 'mobile';
};

function isStorybookFrame(frame: HTMLIFrameElement): boolean {
  // Сообщения шлём только в storybook-iframe'ы (StorybookEmbed). Figma и
  // прочие embeds не должны получать наш theme-sync.
  return /\/storybook\/|:6006\//.test(frame.src);
}

/** Собирает storybook-payload из текущего оформления глобального стора (ключ `theme` ← `colorScheme`). */
function buildSyncPayload(): SyncPayload {
  const appearance = getGlobalThemeStore().getAppearance();
  return {
    type: 'theme-sync',
    theme: (appearance.colorScheme as Theme | undefined) ?? 'light',
    brand: (appearance.brand as Brand | undefined) ?? DEFAULT_BRAND,
    density: (appearance.density as Density | undefined) ?? 'compact',
    // В Storybook платформа следует за глобалом layoutType (переключатель Layout).
    layoutType: appearance.platform === 'webMobile' ? 'mobile' : 'desktop',
  };
}

function broadcastToStorybookFrames() {
  const payload = buildSyncPayload();
  document.querySelectorAll<HTMLIFrameElement>('iframe').forEach(frame => {
    if (!isStorybookFrame(frame)) return;
    frame.contentWindow?.postMessage(payload, '*');
  });
}

type SettingsView = {
  theme: Theme;
  brand: Brand;
  platform: Platform;
  density: Density;
};

function SettingsContent({ view, onChange }: { view: SettingsView; onChange(patch: AppearancePatch): void }) {
  const brand = parseBrand(view.brand);

  return (
    <div className={styles.panel}>
      <div className={styles.row}>
        <span className={styles.label}>Тема</span>
        <SegmentControl
          size='s'
          width='full'
          items={THEME_ITEMS}
          value={view.theme}
          onChange={value => onChange({ colorScheme: value })}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Бренд</span>
        <SegmentControl
          size='s'
          width='full'
          items={BRAND_FAMILY_ITEMS}
          value={brand.family}
          onChange={family => onChange({ brand: composeBrand(family, brand.color) })}
        />
      </div>
      {isColoredFamily(brand.family) ? (
        <div className={styles.row}>
          <span className={styles.label}>Цвет</span>
          <SegmentControl
            size='s'
            width='full'
            items={BRAND_COLOR_ITEMS}
            value={brand.color}
            onChange={color => onChange({ brand: composeBrand(brand.family, color) })}
          />
        </div>
      ) : null}
      <div className={styles.row}>
        <span className={styles.label}>Платформа</span>
        <SegmentControl
          size='s'
          width='full'
          items={PLATFORM_ITEMS}
          value={view.platform}
          onChange={value => onChange({ platform: value })}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Плотность</span>
        <SegmentControl
          size='s'
          width='full'
          items={DENSITY_ITEMS}
          value={view.density}
          onChange={value => onChange({ density: value })}
        />
      </div>
    </div>
  );
}

export function SettingsMenu() {
  // Контекст @ds/theme дефолтит на глобальный стор, поэтому провайдер-родитель не нужен,
  // а чтение реактивно к смене темы.
  const { appearance } = useThemeAppearance();
  const view: SettingsView = {
    theme: (appearance.colorScheme as Theme | undefined) ?? 'light',
    brand: (appearance.brand as Brand | undefined) ?? DEFAULT_BRAND,
    platform: (appearance.platform as Platform | undefined) ?? 'webDesktop',
    density: (appearance.density as Density | undefined) ?? 'compact',
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleSyncRequest = (event: MessageEvent) => {
      if (event.data?.type !== 'theme-sync-request') return;
      const target = event.source as Window | null;
      target?.postMessage(buildSyncPayload(), '*');
    };
    window.addEventListener('message', handleSyncRequest);
    return () => window.removeEventListener('message', handleSyncRequest);
  }, []);

  const update = (patch: AppearancePatch) => {
    setThemeAppearance(patch);
    broadcastToStorybookFrames();
  };

  // На Astro view transitions body постоянно пересоздаётся, и popover, отрендеренный
  // в body через FloatingPortal, теряется после первой навигации. Якоримся к
  // persisted-узлу самой шапки — портал переживёт смену страницы.
  const portalRootRef = useRef<HTMLDivElement>(null);

  return (
    <DocsChromeScope>
      <PortalContextProvider root={portalRootRef}>
        <div ref={portalRootRef} className={styles.anchor}>
          <Dropdown
            open={open}
            onOpenChange={setOpen}
            trigger='click'
            placement='bottom-end'
            widthStrategy='auto'
            triggerClassName={styles.trigger}
            content={<SettingsContent view={view} onChange={update} />}
          >
            <Button
              size='m'
              view='outline'
              appearance='neutral'
              icon={<SettingsSVG />}
              aria-label='Настройки темы и бренда'
              title='Настройки темы и бренда'
            />
          </Dropdown>
        </div>
      </PortalContextProvider>
    </DocsChromeScope>
  );
}
