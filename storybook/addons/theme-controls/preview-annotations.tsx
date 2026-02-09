import type { ComponentType } from 'react';

import { ThemeSyncBridge } from './src/preview/ThemeSyncBridge';

/**
 * Декоратор для синхронизации темы с родительским окном (документация).
 * Слушает postMessage и передаёт данные в глобалы через channel.
 */
export const decorators = [
  (Story: ComponentType) => (
    <ThemeSyncBridge>
      <Story />
    </ThemeSyncBridge>
  ),
];
