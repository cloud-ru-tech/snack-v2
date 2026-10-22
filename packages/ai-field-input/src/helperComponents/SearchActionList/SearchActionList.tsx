import { ReactElement, useCallback, useMemo, useState } from 'react';

import { ACTION_LIST_ITEM_TYPE, TEST_IDS } from '../../constants';
import { useAiFieldInputContext } from '../../context';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputActionListItem, AiFieldInputActionListProps } from '../../types';
import { filterActionListItems, mapActionListItems } from '../../utils';
import { ActionListPanel } from '../ActionListPanel';

export type SearchActionListProps = {
  items: AiFieldInputActionListProps['items'];
  query: string;
  /** Открыт без знака в тексте: буквы в поле не уходят. */
  detached?: boolean;
  onSelect(item: AiFieldInputActionListItem): void;
  onClose?(): void;
  /** Переход на уровень или назад. */
  onLevelChange?(): void;
};

export function SearchActionList({
  items,
  query,
  detached = false,
  onSelect,
  onClose,
  onLevelChange,
}: SearchActionListProps): ReactElement {
  const { t } = aiFieldInputLocale.useTranslations();
  const { getEditor } = useAiFieldInputContext();
  const [path, setPath] = useState<AiFieldInputActionListItem[]>([]);
  const level = path[path.length - 1];

  const handleDrillDown = useCallback(
    (item: AiFieldInputActionListItem) => {
      getEditor?.()?.clearSearchQuery();
      setPath(current => [...current, item]);
      onLevelChange?.();
    },
    [getEditor, onLevelChange],
  );

  const handleBack = useCallback(() => {
    getEditor?.()?.clearSearchQuery();
    setPath(current => current.slice(0, -1));
    onLevelChange?.();
  }, [getEditor, onLevelChange]);

  const handleClose = useCallback(() => {
    getEditor?.()?.dismissSearch();
    onClose?.();
  }, [getEditor, onClose]);

  const listItems = useMemo(() => {
    const levelItems = mapActionListItems(filterActionListItems(level?.items ?? items, query), item => ({
      ...item,
      onClick:
        item.type === ACTION_LIST_ITEM_TYPE.DrillDown && item.items
          ? () => handleDrillDown(item)
          : () => onSelect(item),
    }));

    if (!level) {
      return levelItems;
    }

    const backItem: AiFieldInputActionListItem = {
      id: TEST_IDS.actionListBack,
      type: ACTION_LIST_ITEM_TYPE.Back,
      label: level.backLabel ?? t('back'),
      onClick: handleBack,
    };

    return [backItem, ...levelItems];
  }, [level, items, query, onSelect, handleDrillDown, handleBack, t]);

  return (
    <ActionListPanel
      items={listItems}
      padding
      emptyLabel={t('nothingFound')}
      registerInField
      forwardTyping={!detached}
      focusEditorOnSelect={!detached}
      onClose={handleClose}
    />
  );
}
