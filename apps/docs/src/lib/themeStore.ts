import { getGlobalAdaptiveStore, LAYOUT_TYPE } from '@ds/adaptive';
import { BRAND, getGlobalThemeStore, PLATFORM } from '@ds/theme';

type AppearancePatch = Parameters<ReturnType<typeof getGlobalThemeStore>['setAppearance']>[0];

const STORAGE = {
  colorScheme: 'ds-theme',
  brand: 'ds-brand',
  density: 'ds-density',
  platform: 'ds-platform',
} as const;

function systemColorScheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const BRANDS: string[] = Object.values(BRAND);

function readStored(): AppearancePatch {
  const ls = window.localStorage;
  const storedScheme = ls.getItem(STORAGE.colorScheme);
  const colorScheme = storedScheme === 'dark' || storedScheme === 'light' ? storedScheme : systemColorScheme();
  const storedBrand = ls.getItem(STORAGE.brand);
  return {
    colorScheme,
    // Сохранённое значение могло остаться от удалённых брендов (brandA…) — такое игнорируем.
    brand: storedBrand && BRANDS.includes(storedBrand) ? (storedBrand as AppearancePatch['brand']) : BRAND.CloudConsole,
    density: (ls.getItem(STORAGE.density) as AppearancePatch['density']) ?? 'compact',
    platform: ls.getItem(STORAGE.platform) === PLATFORM.WebMobile ? PLATFORM.WebMobile : PLATFORM.WebDesktop,
  };
}

// Тема не читает раскладку сама: платформу синхронно передаём и в глобальный стор `@ds/adaptive`,
// иначе адаптивные компоненты примеров остались бы в desktop-поверхностях.
function syncLayoutType(platform: AppearancePatch['platform']): void {
  getGlobalAdaptiveStore().setLayoutType(platform === PLATFORM.WebMobile ? LAYOUT_TYPE.Mobile : LAYOUT_TYPE.Desktop);
}

let inited = false;

/** Инициализирует глобальный стор оформления из localStorage один раз (идемпотентно). */
export function ensureThemeStore(): void {
  if (inited || typeof window === 'undefined') return;
  inited = true;
  const stored = readStored();
  getGlobalThemeStore().setAppearance(stored);
  syncLayoutType(stored.platform);
}

/** Запись оси(ей) в глобальный стор + персист в localStorage. */
export function setThemeAppearance(patch: AppearancePatch): void {
  getGlobalThemeStore().setAppearance(patch);
  const ls = window.localStorage;
  if (patch.colorScheme) ls.setItem(STORAGE.colorScheme, patch.colorScheme);
  if (patch.brand) ls.setItem(STORAGE.brand, patch.brand);
  if (patch.density) ls.setItem(STORAGE.density, patch.density);
  if (patch.platform) {
    ls.setItem(STORAGE.platform, patch.platform);
    syncLayoutType(patch.platform);
  }
}
