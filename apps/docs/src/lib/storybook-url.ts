import { withBase } from './base-url';

const STORYBOOK_DEV_URL = 'http://localhost:6006';

/**
 * Адрес Storybook: в проде — корень сайта (Astro `base`) + `/storybook`, в dev — локальный
 * сервер на 6006. Один источник для встроенных фреймов (`StorybookEmbed`) и ссылки в шапке.
 */
export function getStorybookBaseUrl(): string {
  if (import.meta.env.DEV) return STORYBOOK_DEV_URL;
  return withBase('/storybook').replace(/\/$/, '');
}
