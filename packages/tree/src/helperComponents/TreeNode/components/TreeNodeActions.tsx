import { Button } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist, ItemProps } from '@ds/list';
import { Dispatch, FocusEvent, KeyboardEventHandler, SetStateAction, useEffect, useRef } from 'react';

import { TEST_IDS } from '../../../constants';
import { Size, TreeNodeProps } from '../../../types';
import styles from '../styles.module.scss';
import { stopPropagationClick, stopPropagationFocus } from '../utils';

type TreeNodeActionsProps = {
  isDroplistOpen: boolean;
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  getNodeActions(node: Omit<TreeNodeProps, 'href'>): ItemProps[];
  node: Omit<TreeNodeProps, 'href'>;
  isDroplistTriggerFocused: boolean;
  focusNode(): void;
  onBlurActions(event: FocusEvent<HTMLElement>): void;
  size: Size;
};

export function TreeNodeActions({
  getNodeActions,
  isDroplistTriggerFocused,
  focusNode,
  isDroplistOpen,
  setDroplistOpen,
  onBlurActions,
  node,
  size,
}: TreeNodeActionsProps) {
  const droplistActions = getNodeActions(node);

  const localRef = useRef<HTMLButtonElement>(null);
  const returnFocusTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (localRef.current && isDroplistTriggerFocused) {
      localRef.current.focus();
    }
  }, [isDroplistTriggerFocused, localRef]);

  useEffect(
    () => () => {
      clearTimeout(returnFocusTimerRef.current);
    },
    [],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = e => {
    switch (e.key) {
      case 'Tab': {
        focusNode();
        setDroplistOpen(false);
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      case 'ArrowLeft': {
        if (isDroplistTriggerFocused) {
          focusNode();
          setDroplistOpen(false);
          e.stopPropagation();
        }
        return;
      }
      case ' ':
      case 'Enter': {
        e.stopPropagation();

        return;
      }
      case 'ArrowDown': {
        if (isDroplistTriggerFocused) {
          setDroplistOpen(true);
        }

        e.stopPropagation();
        return;
      }
      case 'ArrowUp': {
        // onOpenChange уже поставил возврат фокуса на строку — здесь фокус остаётся на kebab.
        clearTimeout(returnFocusTimerRef.current);
        setDroplistOpen(false);
        localRef.current?.focus();

        e.stopPropagation();
        return;
      }
      default:
        return;
    }
  };

  if (!droplistActions.length) {
    return null;
  }

  return (
    <div
      role='presentation'
      className={styles.treeNodeActions}
      data-focused={isDroplistTriggerFocused || undefined}
      onClick={stopPropagationClick}
      onKeyDown={handleKeyDown}
      onFocus={stopPropagationFocus}
    >
      <Droplist
        open={isDroplistOpen}
        onOpenChange={open => {
          setDroplistOpen(open);

          if (open) {
            return;
          }

          // Droplist возвращает фокус на триггер после onOpenChange: синхронно
          // при выборе пункта и через setTimeout(0) при Escape. Возврат на строку
          // ставим следующим тиком, чтобы он шёл после обоих. Tab и ArrowLeft
          // фокусируют строку сами и до onOpenChange не доходят.
          clearTimeout(returnFocusTimerRef.current);
          returnFocusTimerRef.current = setTimeout(focusNode);
        }}
        items={droplistActions}
        closeDroplistOnItemClick
        placement='bottom-end'
        size={size}
      >
        <Button
          view='elevated'
          appearance='neutral'
          size={size}
          icon={<KebabSVG />}
          onBlur={onBlurActions}
          tabIndex={-1}
          data-test-id={TEST_IDS.droplistTrigger}
          innerRef={localRef}
        />
      </Droplist>
    </div>
  );
}
