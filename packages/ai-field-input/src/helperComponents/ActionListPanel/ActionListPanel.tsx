import { ITEM_PREFIXES, ItemId, kindFlattenItems, List } from '@ds/list';
import cn from 'classnames';
import { KeyboardEvent, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';

import { ACTION_LIST_ITEM_TYPE, TEST_IDS } from '../../constants';
import { useAiFieldInputContext } from '../../context';
import { AiFieldInputActionListItem, AiFieldInputActionListProps } from '../../types';
import { flattenActionListItems } from '../../utils';
import styles from './styles.module.scss';
import { toListItems } from './utils';

export type ActionListPanelProps = AiFieldInputActionListProps & {
  /** Строка вместо пустого списка. */
  emptyLabel?: string;
  /** Список поиска поля: управляется клавишами из редактора. */
  registerInField?: boolean;
  /** Набранные в списке буквы уходят в поле. По умолчанию `true`. */
  forwardTyping?: boolean;
  /** После выбора строки фокус возвращается в поле. По умолчанию `true`. */
  focusEditorOnSelect?: boolean;
};

export function ActionListPanel({
  items,
  padding = false,
  onClose,
  emptyLabel,
  registerInField = false,
  forwardTyping = true,
  focusEditorOnSelect = true,
  className,
  'data-test-id': dataTestId = TEST_IDS.actionList,
  ...rest
}: ActionListPanelProps): ReactElement {
  const { registerActionList, getEditor } = useAiFieldInputContext();
  const keyboardNavigationRef = useRef<{ focusItem(id: ItemId): void }>(null);
  const flatItems = useMemo(() => flattenActionListItems(items), [items]);
  const hasRows = flatItems.some(item => item.type !== ACTION_LIST_ITEM_TYPE.Back);

  const handleSelect = useCallback(
    (item: AiFieldInputActionListItem) => {
      item.onClick?.();
      if (focusEditorOnSelect) getEditor?.()?.focus();
    },
    [focusEditorOnSelect, getEditor],
  );

  const handleClose = useCallback(() => {
    onClose?.();
    getEditor?.()?.focus();
  }, [onClose, getEditor]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      const editor = getEditor?.();
      const isPrintable = event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

      if (forwardTyping && editor && isPrintable) {
        event.preventDefault();
        editor.focus();
        editor.insertText(event.key);
      }
    },
    [forwardTyping, getEditor, handleClose],
  );

  const listItems = useMemo(() => toListItems(items, handleSelect), [items, handleSelect]);

  const autoIds = useMemo(() => {
    const { focusFlattenItems } = kindFlattenItems({
      items: listItems,
      prefix: ITEM_PREFIXES.default,
      parentId: ITEM_PREFIXES.default,
    });
    return new Map(Object.values(focusFlattenItems).map(item => [String(item.originalId), item.id]));
  }, [listItems]);

  const focusItem = useCallback(
    (item?: AiFieldInputActionListItem) => {
      const autoId = item ? autoIds.get(item.id) : undefined;
      if (autoId !== undefined) keyboardNavigationRef.current?.focusItem(autoId);
    },
    [autoIds],
  );

  useEffect(() => {
    if (!registerInField || !registerActionList) {
      return;
    }

    registerActionList({
      focusFirst: () => focusItem(flatItems[0]),
      focusLast: () => focusItem(flatItems[flatItems.length - 1]),
      selectFirst: () => {
        const first = flatItems.find(item => item.type !== ACTION_LIST_ITEM_TYPE.Back);
        if (!first) return false;
        handleSelect(first);
        return true;
      },
      close: handleClose,
    });

    return () => registerActionList(null);
  }, [registerInField, registerActionList, flatItems, focusItem, handleSelect, handleClose]);

  return (
    <div {...rest} className={cn(styles.root, className)} data-padding={padding || undefined} data-test-id={dataTestId}>
      {flatItems.length > 0 && (
        <List
          items={listItems}
          size='m'
          scroll
          keyboardNavigationRef={keyboardNavigationRef}
          scrollContainerClassName={styles.scroll}
          onKeyDown={handleKeyDown}
        />
      )}
      {!hasRows && emptyLabel && (
        <div className={styles.empty} data-test-id={TEST_IDS.actionListEmpty}>
          {emptyLabel}
        </div>
      )}
    </div>
  );
}
