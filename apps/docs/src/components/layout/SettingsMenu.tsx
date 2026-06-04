import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { DaySVG, NightSVG, ProductIcons, SettingsSVG } from '@ds/icons';
import { PortalContextProvider } from '@ds/portal-context';
import { SegmentControl } from '@ds/segment-control';
import { useEffect, useRef, useState } from 'react';

import styles from './SettingsMenu.module.scss';

const { LaptopSVG, MobilePhoneSVG } = ProductIcons;

type Theme = 'light' | 'dark';
type Brand = 'brandA' | 'brandB' | 'brandC';
type BrandRole = 'main' | 'alter' | 'alter2' | 'alter3' | 'alter4';
type Density = 'compact' | 'comfort' | 'spacious';

type Settings = {
  theme: Theme;
  brand: Brand;
  brandRole: BrandRole;
  density: Density;
};

const STORAGE_KEYS = {
  theme: 'ds-theme',
  brand: 'ds-brand',
  brandRole: 'ds-brandRole',
  density: 'ds-density',
} as const;

const DEFAULTS: Settings = {
  theme: 'light',
  brand: 'brandA',
  brandRole: 'main',
  density: 'compact',
};

const THEME_ITEMS = [
  { value: 'light' as const, label: 'Light', icon: <DaySVG />, iconPosition: 'before' as const },
  { value: 'dark' as const, label: 'Dark', icon: <NightSVG />, iconPosition: 'before' as const },
];

const BRAND_ITEMS = [
  { value: 'brandA' as const, label: 'A' },
  { value: 'brandB' as const, label: 'B' },
  { value: 'brandC' as const, label: 'C' },
];

function BrandRoleRing({ strokeWidth }: { strokeWidth: number }) {
  return (
    <svg width={14} height={14} viewBox='0 0 14 14' fill='none' aria-hidden>
      <circle cx='7' cy='7' r='5' fill='none' stroke='currentColor' strokeWidth={strokeWidth} />
    </svg>
  );
}

const BRAND_ROLE_ITEMS = [
  { value: 'main' as const, label: 'Main', icon: <BrandRoleRing strokeWidth={2.5} />, iconPosition: 'before' as const },
  { value: 'alter' as const, label: 'Alter', icon: <BrandRoleRing strokeWidth={1} />, iconPosition: 'before' as const },
  {
    value: 'alter2' as const,
    label: 'Alter 2',
    icon: <BrandRoleRing strokeWidth={1} />,
    iconPosition: 'before' as const,
  },
  {
    value: 'alter3' as const,
    label: 'Alter 3',
    icon: <BrandRoleRing strokeWidth={1} />,
    iconPosition: 'before' as const,
  },
  {
    value: 'alter4' as const,
    label: 'Alter 4',
    icon: <BrandRoleRing strokeWidth={1} />,
    iconPosition: 'before' as const,
  },
];

const DENSITY_ITEMS = [
  { value: 'compact' as const, label: 'Compact', icon: <LaptopSVG />, iconPosition: 'before' as const },
  { value: 'comfort' as const, label: 'Comfort', icon: <MobilePhoneSVG />, iconPosition: 'before' as const },
  { value: 'spacious' as const, label: 'Spacious', icon: <LaptopSVG />, iconPosition: 'before' as const },
];

function readBrand(cls: DOMTokenList): Brand {
  if (cls.contains('sn-brandC')) return 'brandC';
  if (cls.contains('sn-brandB')) return 'brandB';
  return 'brandA';
}

function readBrandRole(cls: DOMTokenList): BrandRole {
  if (cls.contains('sn-alter2')) return 'alter2';
  if (cls.contains('sn-alter3')) return 'alter3';
  if (cls.contains('sn-alter4')) return 'alter4';
  if (cls.contains('sn-alter')) return 'alter';
  return 'main';
}

function readDensity(cls: DOMTokenList): Density {
  if (cls.contains('sn-spacious')) return 'spacious';
  if (cls.contains('sn-comfort')) return 'comfort';
  return 'compact';
}

function readSettings(): Settings {
  const cls = document.documentElement.classList;
  return {
    theme: cls.contains('sn-dark') ? 'dark' : 'light',
    brand: readBrand(cls),
    brandRole: readBrandRole(cls),
    density: readDensity(cls),
  };
}

function applySettings(settings: Settings) {
  const cls = document.documentElement.classList;
  cls.toggle('sn-dark', settings.theme === 'dark');
  cls.toggle('sn-light', settings.theme === 'light');
  cls.toggle('sn-brandA', settings.brand === 'brandA');
  cls.toggle('sn-brandB', settings.brand === 'brandB');
  cls.toggle('sn-brandC', settings.brand === 'brandC');
  cls.toggle('sn-main', settings.brandRole === 'main');
  cls.toggle('sn-alter', settings.brandRole === 'alter');
  cls.toggle('sn-alter2', settings.brandRole === 'alter2');
  cls.toggle('sn-alter3', settings.brandRole === 'alter3');
  cls.toggle('sn-alter4', settings.brandRole === 'alter4');
  cls.toggle('sn-compact', settings.density === 'compact');
  cls.toggle('sn-comfort', settings.density === 'comfort');
  cls.toggle('sn-spacious', settings.density === 'spacious');
}

function isStorybookFrame(frame: HTMLIFrameElement): boolean {
  // Сообщения шлём только в storybook-iframe'ы (StorybookEmbed). Figma и
  // прочие embeds не должны получать наш theme-sync.
  return /\/storybook\/|:6006\//.test(frame.src);
}

function buildSyncPayload(settings: Settings) {
  return {
    type: 'theme-sync' as const,
    theme: settings.theme,
    brand: settings.brand,
    brandRole: settings.brandRole,
    density: settings.density,
  };
}

function broadcastToStorybookFrames(settings: Settings) {
  const payload = buildSyncPayload(settings);
  document.querySelectorAll<HTMLIFrameElement>('iframe').forEach(frame => {
    if (!isStorybookFrame(frame)) return;
    frame.contentWindow?.postMessage(payload, '*');
  });
}

function SettingsContent({ settings, onChange }: { settings: Settings; onChange(next: Partial<Settings>): void }) {
  return (
    <div className={styles.panel}>
      <div className={styles.row}>
        <span className={styles.label}>Тема</span>
        <SegmentControl
          size='s'
          width='full'
          items={THEME_ITEMS}
          value={settings.theme}
          onChange={value => onChange({ theme: value })}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Бренд</span>
        <SegmentControl
          size='s'
          width='full'
          items={BRAND_ITEMS}
          value={settings.brand}
          onChange={value => onChange({ brand: value })}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Brand role</span>
        <SegmentControl
          size='s'
          width='full'
          items={BRAND_ROLE_ITEMS}
          value={settings.brandRole}
          onChange={value => onChange({ brandRole: value })}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Платформа</span>
        <SegmentControl
          size='s'
          width='full'
          items={DENSITY_ITEMS}
          value={settings.density}
          onChange={value => onChange({ density: value })}
        />
      </div>
    </div>
  );
}

export function SettingsMenu() {
  // Lazy initializer читает классы из <html>, выставленные inline-скриптом
  // в DocsLayout.astro до гидратации. Это убирает мигание между DEFAULTS
  // и реальным состоянием на первом рендере.
  const [settings, setSettings] = useState<Settings>(() =>
    typeof document === 'undefined' ? DEFAULTS : readSettings(),
  );
  const [open, setOpen] = useState(false);

  // Ref на актуальные настройки нужен, чтобы handler theme-sync-request
  // от вновь смонтированного storybook iframe всегда отдавал свежие значения.
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const handleSyncRequest = (event: MessageEvent) => {
      if (event.data?.type !== 'theme-sync-request') return;
      const target = event.source as Window | null;
      target?.postMessage(buildSyncPayload(settingsRef.current), '*');
    };
    window.addEventListener('message', handleSyncRequest);
    return () => window.removeEventListener('message', handleSyncRequest);
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next: Settings = { ...settings, ...patch };
    applySettings(next);
    (Object.keys(patch) as Array<keyof Settings>).forEach(key => {
      const value = next[key];
      if (value) localStorage.setItem(STORAGE_KEYS[key], value);
    });
    broadcastToStorybookFrames(next);
    setSettings(next);
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
          content={<SettingsContent settings={settings} onChange={update} />}
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
