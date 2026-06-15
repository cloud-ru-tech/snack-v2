import { Checkbox, Switch } from '@ds/toggles';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import { TEST_IDS } from '../../../constants';
import { ItemContent } from '../../../helperComponents';
import {
  useCollapseLevelContext,
  useNewListContext,
  useOpenListContext,
  useSelectionContext,
} from '../../Lists/contexts';
import commonStyles from '../styles.module.scss';
import { FlattenBaseItem } from '../types';
import { isContentItem } from '../utils';
import { CHECKBOX_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

type AllBaseItemProps = FlattenBaseItem & {
  expandIcon?: ReactNode;
  open?: boolean;
  indeterminate?: boolean;
  onSelect?(): void;
  isParentNode?: boolean;
  onOpenNestedList?(e?: KeyboardEvent<HTMLElement>): void;
};

export function BaseItem({
  beforeContent,
  afterContent,
  content,
  onClick,
  onMouseDown,
  id,
  expandIcon,
  disabled,
  open,
  itemRef,
  switch: switchProp,
  onKeyDown,
  onFocus,
  indeterminate,
  checked: checkedProp,
  onSelect,
  onOpenNestedList,
  isParentNode,
  className,
  inactive,
  itemWrapRender,
  ...rest
}: AllBaseItemProps) {
  const interactive = !inactive;

  const { size = 's', marker, contentRender, firstItemId, focusFlattenItems } = useNewListContext();
  const { level = 0 } = useCollapseLevelContext();
  const { closeDroplist, closeDroplistOnItemClick } = useOpenListContext();
  const { value, onChange, mode, isSelectionSingle, isSelectionMultiple } = useSelectionContext();

  const isChecked = isSelectionSingle ? (checkedProp ?? value === id) : (checkedProp ?? value?.includes(id ?? ''));

  const handleChange = () => {
    onChange?.(id);
  };

  const handleItemMouseDown = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return;

    onMouseDown?.(e);
  };

  const handleItemFocus = (e: FocusEvent<HTMLElement>) => {
    onFocus?.(e);
    e.stopPropagation();
  };

  const handleCheckboxChange = () => {
    if (isParentNode && onSelect) {
      onSelect();
    } else {
      handleChange();
    }
  };

  const handleItemClick = (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    // Активация элемента: клик мышью и Enter/Space с клавиатуры дают одинаковый эффект.
    // `onClick` в публичном API типизирован под `MouseEvent` (это семантически клик по
    // пункту меню), поэтому keyboard-событие пробрасывается под тем же типом.
    onClick?.(e as MouseEvent<HTMLElement>);

    if (interactive && !isParentNode) {
      handleChange();
    }

    if (!isSelectionMultiple && closeDroplistOnItemClick) {
      closeDroplist();
    }
  };

  const handleItemKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e);

    if (e.key === 'ArrowRight' && onOpenNestedList) {
      onOpenNestedList(e);

      e.preventDefault();
      e.stopPropagation();

      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      if (isSelectionMultiple && isParentNode && onSelect) {
        onSelect();
      }

      // Повторяем клик по элементу: `handleItemClick` сам вызывает `handleChange` /
      // `closeDroplist`. Отдельный `handleChange` здесь не нужен — иначе в multiple-режиме
      // выбор переключался бы дважды (toggle + откат) и Enter не менял бы состояние.
      !isParentNode && handleItemClick(e);

      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleCheckboxClick = (e: MouseEvent) => {
    if (isParentNode) {
      e.stopPropagation();
    }
  };

  const props = extractSupportProps(rest);

  const stateLayerState =
    isSelectionSingle && isChecked && !switchProp && !isParentNode ? 'activatedFilled' : 'regularFilled';

  const itemJSX = (
    <div
      className={cn(commonStyles.itemWrapper, styles.innerWrapper, className)}
      data-inactive={inactive || undefined}
      data-disabled={disabled || undefined}
      data-variant={mode || undefined}
      data-checked={(isParentNode && isChecked) || (!isParentNode && isChecked && !switchProp) || undefined}
    >
      <span className={commonStyles.stateLayer} aria-hidden data-state={stateLayerState} />
      <li
        data-type='outside'
        role={'menuitem'}
        data-test-id={props['data-test-id'] || `${TEST_IDS.baseItem}_${id}`}
        ref={itemRef as RefObject<HTMLLIElement>}
        className={cn(commonStyles.listItem, styles.droplistItem)}
        data-size={size}
        onClick={handleItemClick}
        onMouseDown={handleItemMouseDown}
        tabIndex={firstItemId && id === focusFlattenItems[firstItemId]?.originalId ? 0 : -1}
        data-non-pointer={(inactive && !onClick) || undefined}
        data-variant={mode || undefined}
        data-open={open || undefined}
        onKeyDown={handleItemKeyDown}
        onFocus={handleItemFocus}
        style={{ '--level': level }}
        data-level-one={level === 1 || undefined}
        data-level-more-one={level > 1 || undefined}
        data-checked={(isParentNode && (indeterminate || isChecked)) || (isChecked && !switchProp) || undefined}
      >
        {!switchProp && isSelectionSingle && marker && !isParentNode && interactive && (
          <div className={styles.markerContainer} data-test-id={TEST_IDS.baseItemMarker} />
        )}

        {!switchProp && isSelectionMultiple && interactive && (
          <div className={styles.checkbox}>
            <Checkbox
              size={CHECKBOX_SIZE_MAP[size ?? 's']}
              disabled={disabled}
              tabIndex={-1}
              onChange={isParentNode ? handleCheckboxChange : undefined}
              checked={isChecked}
              data-test-id={TEST_IDS.baseItemCheckbox}
              onClick={handleCheckboxClick}
              indeterminate={indeterminate}
            />
          </div>
        )}

        {beforeContent && <div className={styles.beforeContent}>{beforeContent}</div>}
        {content && isContentItem(content) ? (
          (contentRender?.({ id, content, disabled }) ?? <ItemContent disabled={disabled} {...content} />)
        ) : (
          <div className={styles.content}> {content} </div>
        )}
        {afterContent && <div className={styles.afterContent}>{afterContent}</div>}

        {switchProp && interactive && (
          <Switch
            disabled={disabled}
            checked={isChecked}
            data-test-id={TEST_IDS.baseItemSwitch}
            // TODO Phase 5: восстановить поддержку showIcon={showSwitchIcon} когда появится в @ds/toggles
          />
        )}

        {!switchProp && expandIcon && <span className={styles.expandableIcon}>{expandIcon}</span>}
      </li>
    </div>
  );

  if (!itemWrapRender) {
    return itemJSX;
  }

  return itemWrapRender(itemJSX);
}
