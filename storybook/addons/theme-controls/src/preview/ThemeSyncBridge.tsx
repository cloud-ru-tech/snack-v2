import React, { useEffect } from 'react';
import { addons } from 'storybook/preview-api';

import { CHANNEL_SYNC_EVENT } from '../constants';

/**
 * Слушает postMessage от родителя (документация) и синхронизирует
 * тему/бренд/платформу с глобалами Storybook через channel (обрабатывается в manager).
 */
export function ThemeSyncBridge({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const channel = addons.getChannel();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'theme-sync') {
        const { theme, brand, platform } = event.data;
        channel.emit(CHANNEL_SYNC_EVENT, { theme, brand, platform });
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
