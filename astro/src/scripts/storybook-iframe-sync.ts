/**
 * Storybook Iframe Theme Sync
 * Синхронизация темы между документацией и Storybook iframe
 */

type ThemeManager = {
  getTheme: () => string;
  getBrand: () => string;
  getPlatform: () => string;
};

type ThemeSyncMessage = {
  type: 'theme-sync';
  theme: string;
  brand: string;
  platform: string;
};

declare global {
  interface Window {
    snThemeManager?: ThemeManager;
  }
}

function sendThemeToIframe(iframe: HTMLIFrameElement, manager: ThemeManager): void {
  try {
    const message: ThemeSyncMessage = {
      type: 'theme-sync',
      theme: manager.getTheme(),
      brand: manager.getBrand(),
      platform: manager.getPlatform(),
    };

    iframe.contentWindow?.postMessage(message, '*');
  } catch (_error) {
    // Cross-origin iframe, игнорируем
  }
}

export function syncThemeWithIframes(): void {
  const manager = window.snThemeManager;

  if (!manager) {
    return;
  }

  // Находим все iframe со Storybook
  const iframes = document.querySelectorAll('iframe.storybook-iframe') as NodeListOf<HTMLIFrameElement>;

  iframes.forEach(iframe => {
    // Отправляем текущую тему при загрузке iframe
    iframe.addEventListener('load', () => {
      sendThemeToIframe(iframe, manager);
    });
  });

  // Слушаем изменения темы и передаем в iframe
  const syncHandler = (): void => {
    iframes.forEach(iframe => {
      sendThemeToIframe(iframe, manager);
    });
  };

  window.addEventListener('themeChange', syncHandler);
  window.addEventListener('brandChange', syncHandler);
  window.addEventListener('platformChange', syncHandler);
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncThemeWithIframes);
  } else {
    syncThemeWithIframes();
  }

  document.addEventListener('astro:page-load', syncThemeWithIframes);
}
