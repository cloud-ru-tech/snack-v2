import { Button } from '@ds/button';
import { DaySVG, NightSVG, ProductIcons, SettingsSVG } from '@ds/icons';

const { LaptopSVG, MobilePhoneSVG } = ProductIcons;
import { Popover } from '@ds/popover';
import { SegmentControl } from '@ds/segment-control';
import { useEffect, useState } from 'react';

import styles from './SettingsMenu.module.scss';

type Theme = 'light' | 'dark';
type Brand = 'brandA' | 'brandB' | 'brandC';
type BrandRole = 'main' | 'alter';
type Density = 'compact' | 'comfort';

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
];

const DENSITY_ITEMS = [
  { value: 'compact' as const, label: 'Compact', icon: <LaptopSVG />, iconPosition: 'before' as const },
  { value: 'comfort' as const, label: 'Comfort', icon: <MobilePhoneSVG />, iconPosition: 'before' as const },
];

function readBrand(cls: DOMTokenList): Brand {
  if (cls.contains('sn-brandB')) return 'brandB';
  if (cls.contains('sn-brandC')) return 'brandC';
  return 'brandA';
}

function readSettings(): Settings {
  const cls = document.documentElement.classList;
  return {
    theme: cls.contains('sn-dark') ? 'dark' : 'light',
    brand: readBrand(cls),
    brandRole: cls.contains('sn-alter') ? 'alter' : 'main',
    density: cls.contains('sn-comfort') ? 'comfort' : 'compact',
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
  cls.toggle('sn-compact', settings.density === 'compact');
  cls.toggle('sn-comfort', settings.density === 'comfort');
}

function broadcastToStorybookFrames(settings: Settings) {
  const payload = {
    type: 'theme-sync',
    theme: settings.theme,
    brand: settings.brand,
    brandRole: settings.brandRole,
    platform: settings.density,
  };
  document.querySelectorAll<HTMLIFrameElement>('iframe').forEach(frame => {
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
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = readSettings();
    setSettings(current);

    const handleSyncRequest = (event: MessageEvent) => {
      if (event.data?.type === 'theme-sync-request') {
        const target = event.source as Window | null;
        target?.postMessage(
          {
            type: 'theme-sync',
            theme: current.theme,
            brand: current.brand,
            brandRole: current.brandRole,
            platform: current.density,
          },
          '*',
        );
      }
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

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger='click'
      placement='bottom-end'
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
    </Popover>
  );
}
