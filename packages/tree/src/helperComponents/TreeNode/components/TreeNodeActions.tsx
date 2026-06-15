import { Button } from '@ds/button';
import { KebabSVG } from '@ds/icons';
import { Droplist, ItemProps } from '@ds/list';
import { Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useRef } from 'react';

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
  onBlurActions(): void;
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

  useEffect(() => {
    if (localRef.current && isDroplistTriggerFocused) {
      localRef.current.focus();
    }
  }, [isDroplistTriggerFocused, localRef]);

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
          // Закрытие дроплиста (по клику в пункт, ESC, outside-click) должно
          // вернуть фокус на строку и снять `isDroplistTriggerFocused` —
          // иначе kebab остаётся в visible-hover-состоянии. Tab и ArrowLeft
          // уже делают это сами; для пути через `closeDroplistOnItemClick`
          // ресет навешиваем здесь.
          if (!open) {
            focusNode();
          }
        }}
        items={droplistActions}
        closeDroplistOnItemClick
        placement='bottom-end'
        size='m'
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
