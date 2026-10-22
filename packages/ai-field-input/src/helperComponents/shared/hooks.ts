import { Item } from '@ds/list';
import { useCallback, useMemo, useState } from 'react';

import { ACTION_LIST_ITEM_TYPE, TEST_IDS } from '../../constants';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputActionListItem, AiFieldInputActionListProps } from '../../types';
import { mapActionListItems } from '../../utils';
import { toListItems } from '../ActionListPanel/utils';

export type ActionListLevel = {
  /** Подпись строки возврата. Без неё строки возврата нет. */
  label?: string;
  items: AiFieldInputActionListProps['items'];
};

/** Уровни списка в одном bottom sheet: переход заменяет строки, первая строка уровня — возврат. */
export function useActionListLevels(onPick: (item: AiFieldInputActionListItem) => void, initial?: ActionListLevel) {
  const { t } = aiFieldInputLocale.useTranslations();
  const [levels, setLevels] = useState<ActionListLevel[]>(() => (initial ? [initial] : []));
  const top = levels[levels.length - 1];

  const open = useCallback((level: ActionListLevel) => setLevels([level]), []);
  const reset = useCallback(() => setLevels([]), []);

  const listItems = useMemo<Item[]>(() => {
    if (!top) return [];

    const rows = mapActionListItems(top.items, item => ({
      ...item,
      onClick:
        item.type === ACTION_LIST_ITEM_TYPE.DrillDown && item.items
          ? () => setLevels(current => [...current, { label: item.backLabel ?? t('back'), items: item.items ?? [] }])
          : () => onPick(item),
    }));

    const back: AiFieldInputActionListItem[] =
      top.label === undefined
        ? []
        : [
            {
              id: TEST_IDS.actionListBack,
              type: ACTION_LIST_ITEM_TYPE.Back,
              label: top.label,
              onClick: () => setLevels(current => current.slice(0, -1)),
            },
          ];

    return toListItems([...back, ...rows], item => item.onClick?.());
  }, [top, onPick, t]);

  return { isOpen: Boolean(top), listItems, open, reset };
}
