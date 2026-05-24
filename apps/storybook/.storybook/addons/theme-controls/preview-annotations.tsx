import { ComponentType } from 'react';

import { INITIAL_GLOBALS } from './src/constants';
import { ThemeSyncBridge } from './src/preview/ThemeSyncBridge';

/** Начальные значения глобалов для тулбара (`useGlobals` / `updateGlobals`). */
export const initialGlobals = { ...INITIAL_GLOBALS };

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
