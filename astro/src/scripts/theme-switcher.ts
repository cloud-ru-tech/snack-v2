/**
 * Theme Switcher Script
 * Инициализация переключателя темы для работы с глобальным theme-manager
 */
import { consola } from 'consola';

type ThemeManager = {
  getTheme: () => string;
  getBrand: () => string;
  getPlatform: () => string;
  setTheme: (theme: string) => void;
  setBrand: (brand: string) => void;
  setPlatform: (platform: string) => void;
};

declare global {
  interface Window {
    snThemeManager?: ThemeManager;
  }
}

export function initThemeSwitcher(): void {
  // Получаем глобальный менеджер темы
  const manager = window.snThemeManager;

  if (!manager) {
    consola.warn('Theme manager not found');
    return;
  }

  // Получаем элементы
  const themeSelect = document.getElementById('theme-select') as HTMLSelectElement | null;
  const brandSelect = document.getElementById('brand-select') as HTMLSelectElement | null;
  const platformSelect = document.getElementById('platform-select') as HTMLSelectElement | null;

  if (!themeSelect || !brandSelect || !platformSelect) {
    return;
  }

  // Устанавливаем текущие значения
  themeSelect.value = manager.getTheme();
  brandSelect.value = manager.getBrand();
  platformSelect.value = manager.getPlatform();

  // Слушаем изменения
  themeSelect.addEventListener('change', e => {
    manager.setTheme((e.target as HTMLSelectElement).value);
  });

  brandSelect.addEventListener('change', e => {
    manager.setBrand((e.target as HTMLSelectElement).value);
  });

  platformSelect.addEventListener('change', e => {
    manager.setPlatform((e.target as HTMLSelectElement).value);
  });

  // Слушаем изменения от других источников (например, из devtools)
  window.addEventListener('themeChange', ((e: CustomEvent) => {
    themeSelect.value = e.detail.value;
  }) as EventListener);

  window.addEventListener('brandChange', ((e: CustomEvent) => {
    brandSelect.value = e.detail.value;
  }) as EventListener);

  window.addEventListener('platformChange', ((e: CustomEvent) => {
    platformSelect.value = e.detail.value;
  }) as EventListener);
}

// Auto-init
if (typeof window !== 'undefined') {
  // Инициализация после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
  } else {
    initThemeSwitcher();
  }

  // Реинициализация при навигации (для SPA режима Astro)
  document.addEventListener('astro:page-load', initThemeSwitcher);
}
