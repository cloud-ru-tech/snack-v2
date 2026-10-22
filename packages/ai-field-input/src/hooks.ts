import { useMemo } from 'react';

import { useAiFieldInputContext } from './context';
import { AiFieldInputActions } from './types';

/** Действия поля для компонентов, лежащих в его слотах, например пункт меню кнопки добавления. */
export function useAiFieldInputActions(): AiFieldInputActions {
  const { openActionList } = useAiFieldInputContext();

  return useMemo(() => ({ openActionList: trigger => openActionList?.(trigger) }), [openActionList]);
}
