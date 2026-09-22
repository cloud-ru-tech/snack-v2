import { ReactNode, useEffect } from 'react';
import { addons } from 'storybook/preview-api';

import { CHANNEL_SYNC_EVENT } from '../constants';

/**
 * Слушает postMessage от родителя (документация) и синхронизирует
 * тему/бренд/плотность/раскладку с глобалами Storybook через channel (обрабатывается в manager).
 */
export function ThemeSyncBridge({ children }: { children: ReactNode }) {
  useEffect(() => {
    const channel = addons.getChannel();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'theme-sync') {
        const { theme, brand, density, language, layoutType } = event.data;
        // Раскладку, зафиксированную в URL embed-а (`globals=layoutType:mobile`), документация не перетирает.
        const layoutForced = /(^|;)layoutType:/.test(new URLSearchParams(window.location.search).get('globals') ?? '');
        channel.emit(CHANNEL_SYNC_EVENT, {
          theme,
          brand,
          density,
          language,
          layoutType: layoutForced ? undefined : layoutType,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    window.parent?.postMessage({ type: 'theme-sync-request' }, '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return <>{children}</>;
}
