import { BRAND, DENSITY, PLATFORM } from '@ds/theme/ssr';

/**
 * Оформление обвязки доки (шапка, навигация, оглавление, меню). Бренд, плотность и платформа из
 * настроек применяются только к примерам на странице; обвязка их не меняет — общая только цветовая схема.
 */
export const CHROME_APPEARANCE = {
  brand: BRAND.CloudConsole,
  density: DENSITY.Compact,
  platform: PLATFORM.WebDesktop,
} as const;

/** Корень порталов обвязки: оверлеи хрома не получают оформление примеров с `#ds-portal-root`. */
export const CHROME_PORTAL_ROOT_ID = 'docs-chrome-portal-root';
