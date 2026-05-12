import { ReactNode, useEffect } from 'react';
import { addons } from 'storybook/preview-api';

import { CHANNEL_SYNC_EVENT } from '../constants';

/**
 * Слушает postMessage от родителя (документация) и синхронизирует
 * тему/бренд/платформу с глобалами Storybook через channel (обрабатывается в manager).
 */
export function ThemeSyncBridge({ children }: { children: ReactNode }) {
  useEffect(() => {
    const channel = addons.getChannel();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'theme-sync') {
        const { theme, brand, brandRole, platform, density, language } = event.data;
        // Docs шлёт density под именем `platform`, поддерживаем оба ключа.
        channel.emit(CHANNEL_SYNC_EVENT, { theme, brand, brandRole, density: density ?? platform, language });
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
