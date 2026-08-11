import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { LaptopSVG, MobilePhoneSVG } from '@ds/icons/interface/product';
import { DaySVG, NightSVG, SettingsSVG } from '@ds/icons/interface/system';
import { PortalContextProvider } from '@ds/portal-context';
import { type Segment, SegmentControl } from '@ds/segment-control';
import { BRAND, BRAND_ROLE, COLOR_SCHEME, DENSITY, getGlobalThemeStore, useThemeAppearance } from '@ds/theme';
import { useEffect, useRef, useState } from 'react';

import { ensureThemeStore, setThemeAppearance } from '../../lib/themeStore';
import styles from './SettingsMenu.module.scss';

// Стор оформления инициализируется из localStorage до первого рендера компонента.
ensureThemeStore();

// Оси выводятся из рантайм-констант @ds/theme: value-импорт hydration-safe в Astro,
// в отличие от type-импорта (см. docs-dev-type-import-gotcha).
type Theme = (typeof COLOR_SCHEME)[keyof typeof COLOR_SCHEME];
type Brand = (typeof BRAND)[keyof typeof BRAND];
type BrandRole = (typeof BRAND_ROLE)[keyof typeof BRAND_ROLE];
type Density = (typeof DENSITY)[keyof typeof DENSITY];

type AppearancePatch = Parameters<ReturnType<typeof getGlobalThemeStore>['setAppearance']>[0];

const THEME_ITEMS: Segment<Theme>[] = [
  { value: 'light', label: 'Light', icon: <DaySVG />, iconPosition: 'before' },
  { value: 'dark', label: 'Dark', icon: <NightSVG />, iconPosition: 'before' },
];

const BRAND_ITEMS: Segment<Brand>[] = [
  { value: 'brandA', label: 'A' },
  { value: 'brandB', label: 'B' },
  { value: 'brandC', label: 'C' },
  { value: 'brandD', label: 'D' },
];

function BrandRoleRing({ strokeWidth }: { strokeWidth: number }) {
  return (
    <svg width={14} height={14} viewBox='0 0 14 14' fill='none' aria-hidden>
      <circle cx='7' cy='7' r='5' fill='none' stroke='currentColor' strokeWidth={strokeWidth} />
    </svg>
  );
}

const BRAND_ROLE_ITEMS: Segment<BrandRole>[] = [
  { value: 'main', label: 'Main', icon: <BrandRoleRing strokeWidth={2.5} />, iconPosition: 'before' },
  { value: 'alter', label: 'Alter', icon: <BrandRoleRing strokeWidth={1} />, iconPosition: 'before' },
  { value: 'alter2', label: 'Alter 2', icon: <BrandRoleRing strokeWidth={1} />, iconPosition: 'before' },
  { value: 'alter3', label: 'Alter 3', icon: <BrandRoleRing strokeWidth={1} />, iconPosition: 'before' },
  { value: 'alter4', label: 'Alter 4', icon: <BrandRoleRing strokeWidth={1} />, iconPosition: 'before' },
];

const DENSITY_ITEMS: Segment<Density>[] = [
  { value: 'compact', label: 'Compact', icon: <LaptopSVG />, iconPosition: 'before' },
  { value: 'comfort', label: 'Comfort', icon: <MobilePhoneSVG />, iconPosition: 'before' },
  { value: 'spacious', label: 'Spacious', icon: <LaptopSVG />, iconPosition: 'before' },
];

type SyncPayload = {
  type: 'theme-sync';
  theme: Theme;
  brand: Brand;
  brandRole: BrandRole;
  density: Density;
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
    brand: (appearance.brand as Brand | undefined) ?? 'brandA',
    brandRole: (appearance.brandRole as BrandRole | undefined) ?? 'main',
    density: (appearance.density as Density | undefined) ?? 'compact',
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
  brandRole: BrandRole;
  density: Density;
};

function SettingsContent({ view, onChange }: { view: SettingsView; onChange(patch: AppearancePatch): void }) {
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
          items={BRAND_ITEMS}
          value={view.brand}
          onChange={value => onChange({ brand: value })}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Brand role</span>
        <SegmentControl
          size='s'
          width='full'
          items={BRAND_ROLE_ITEMS}
          value={view.brandRole}
          onChange={value => onChange({ brandRole: value })}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Платформа</span>
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
    brand: (appearance.brand as Brand | undefined) ?? 'brandA',
    brandRole: (appearance.brandRole as BrandRole | undefined) ?? 'main',
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
  );
}
