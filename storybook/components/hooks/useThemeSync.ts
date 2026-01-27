import { useEffect } from 'react';

import type { Brand, Platform, Theme, ThemeSyncData } from '../types';

type UseThemeSyncProps = {
  setTheme: (theme: Theme) => void;
  setBrand: (brand: Brand) => void;
  setPlatform: (platform: Platform) => void;
};

/**
 * Хук для синхронизации темы, бренда и платформы с родительским окном
 */
export const useThemeSync = ({ setTheme, setBrand, setPlatform }: UseThemeSyncProps) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'theme-sync') {
        const data = event.data as { type: string } & ThemeSyncData;
        if (data.theme) setTheme(data.theme);
        if (data.brand) setBrand(data.brand);
        if (data.platform) setPlatform(data.platform);
      }
    };

    window.addEventListener('message', handleMessage);

    // Запрашиваем текущую тему при загрузке
    window.parent?.postMessage({ type: 'theme-sync-request' }, '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setTheme, setBrand, setPlatform]);
};
