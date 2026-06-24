import { getGlobalThemeStore } from '@ds/theme';

type AppearancePatch = Parameters<ReturnType<typeof getGlobalThemeStore>['setAppearance']>[0];

const STORAGE = {
  colorScheme: 'ds-theme',
  brand: 'ds-brand',
  brandRole: 'ds-brandRole',
  density: 'ds-density',
} as const;

function systemColorScheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStored(): AppearancePatch {
  const ls = window.localStorage;
  const storedScheme = ls.getItem(STORAGE.colorScheme);
  const colorScheme = storedScheme === 'dark' || storedScheme === 'light' ? storedScheme : systemColorScheme();
  return {
    colorScheme,
    brand: (ls.getItem(STORAGE.brand) as AppearancePatch['brand']) ?? 'brandA',
    brandRole: (ls.getItem(STORAGE.brandRole) as AppearancePatch['brandRole']) ?? 'main',
    density: (ls.getItem(STORAGE.density) as AppearancePatch['density']) ?? 'compact',
  };
}

let inited = false;

/** Инициализирует глобальный стор оформления из localStorage один раз (идемпотентно). */
export function ensureThemeStore(): void {
  if (inited || typeof window === 'undefined') return;
  inited = true;
  getGlobalThemeStore().setAppearance(readStored());
}

/** Запись оси(ей) в глобальный стор + персист в localStorage. */
export function setThemeAppearance(patch: AppearancePatch): void {
  getGlobalThemeStore().setAppearance(patch);
  const ls = window.localStorage;
  if (patch.colorScheme) ls.setItem(STORAGE.colorScheme, patch.colorScheme);
  if (patch.brand) ls.setItem(STORAGE.brand, patch.brand);
  if (patch.brandRole) ls.setItem(STORAGE.brandRole, patch.brandRole);
  if (patch.density) ls.setItem(STORAGE.density, patch.density);
}
