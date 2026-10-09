import { Checkbox, Switch } from '@ds/toggles';
import { extractSupportProps, ValueOf } from '@ds/utils';
import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import { DEFAULT_SIZE, MODE, TEST_IDS } from '../../../constants';
import { ItemContent } from '../../../helperComponents';
import {
  useCollapseLevelContext,
  useNewListContext,
  useOpenListContext,
  useSelectionContext,
} from '../../Lists/contexts';
import commonStyles from '../styles.module.scss';
import { FlattenBaseItem } from '../types';
import { isContentItem, isPrimitiveContent } from '../utils';
import { TOGGLE_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

type AllBaseItemProps = FlattenBaseItem & {
  expandIcon?: ReactNode;
  open?: boolean;
  indeterminate?: boolean;
  onSelect?(): void;
  isParentNode?: boolean;
  onOpenNestedList?(e?: KeyboardEvent<HTMLElement>): void;
  /**
   * Переключение раскрытия вложенного списка. Триггер — вся строка целиком (клик или
   * Enter/Space). Если передан `onExpandIconClick`, клик по строке раскрытие больше не
   * переключает и остаётся только клавиатурным триггером.
   */
  onToggleExpand?(): void;
  /**
   * Переключение раскрытия кликом по шеврону `groupIndicator`. Наличие обработчика и есть
   * режим: пока он не передан, шеврон — неинтерактивный индикатор состояния, а раскрытие
   * переключает клик по всей строке (`onToggleExpand`).
   */
  onExpandIconClick?(e: MouseEvent<HTMLElement>): void;
  /**
   * Слот ручки drag&drop (Figma `centeredWrapper`) — рендерится первым в строке, перед
   * маркером/чекбоксом. Интерактивность (обработчики `@dnd-kit`) и содержимое (иконка)
   * приходят снаружи — `BaseItem` только позиционирует слот, ничего не знает про DnD.
   */
  dragHandle?: ReactNode;
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
  showSwitchIcon,
  onKeyDown,
  onFocus,
  indeterminate,
  checked: checkedProp,
  onSelect,
  onOpenNestedList,
  onToggleExpand,
  onExpandIconClick,
  isParentNode,
  className,
  inactive,
  itemWrapRender,
  dragHandle,
  ...rest
}: AllBaseItemProps) {
  const interactive = !inactive;

  const {
    size = DEFAULT_SIZE,
    marker,
    contentRender,
    itemRender,
    firstItemId,
    focusFlattenItems,
  } = useNewListContext();
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

    if (isParentNode) {
      // Раскрытие вложенного списка триггерит вся строка целиком — кроме режима, где тогл
      // отдан шеврону (`onExpandIconClick`): там клик по строке принадлежит потребителю
      // (`onClick`, ссылка из `itemWrapRender`) и раскрытия не меняет.
      if (!onExpandIconClick) {
        onToggleExpand?.();
      }
    } else if (interactive) {
      handleChange();
    }

    if (!isParentNode && !isSelectionMultiple && closeDroplistOnItemClick) {
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
      if (isParentNode) {
        // В multiple-режиме Enter/Space на группе выбирает всю ветку, иначе — раскрывает её.
        if (isSelectionMultiple && onSelect) {
          onSelect();
        } else {
          onToggleExpand?.();
        }
      } else {
        // Повторяем клик по элементу: `handleItemClick` сам вызывает `handleChange` /
        // `closeDroplist`. Отдельный `handleChange` здесь не нужен — иначе в multiple-режиме
        // выбор переключался бы дважды (toggle + откат) и Enter не менял бы состояние.
        handleItemClick(e);
      }

      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleExpandIconClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    onExpandIconClick?.(e);
  };

  const handleCheckboxClick = (e: MouseEvent) => {
    if (isParentNode) {
      e.stopPropagation();
    }
  };

  const props = extractSupportProps(rest);

  let contentNode: ReactNode;
  let contentFromRender = Boolean(contentRender);
  if (content && isContentItem(content)) {
    contentNode = contentRender?.({ id, content, disabled }) ?? <ItemContent disabled={disabled} {...content} />;
  } else if (isPrimitiveContent(content)) {
    // Примитивный content — шорткат `{ label: content }`: рендерим через ItemContent,
    // чтобы строка получила размерную высоту, а не схлопывалась до высоты текста.
    const primitiveContent = { label: content };
    contentNode = contentRender?.({ id, content: primitiveContent, disabled }) ?? (
      <ItemContent disabled={disabled} label={content} />
    );
  } else {
    contentNode = contentRender?.({ id, content, disabled }) ?? <div className={styles.content}> {content} </div>;
    // Неструктурный content оболочка не разберёт на label/caption — отдаём готовый узел.
    contentFromRender = true;
  }

  const stateLayerState =
    isSelectionSingle && isChecked && !switchProp && !isParentNode
      ? 'activatedOnBackground'
      : 'emptyNeutralOnBackground';

  const dataTestId = typeof props['data-test-id'] === 'string' ? props['data-test-id'] : `${TEST_IDS.baseItem}_${id}`;
  const tabIndex = firstItemId && id === focusFlattenItems[firstItemId]?.originalId ? 0 : -1;

  const dragHandleNode = dragHandle ? <div className={styles.dragHandle}>{dragHandle}</div> : undefined;

  // Маркер/чекбокс/шеврон-обёртка нужны только дефолтной разметке; при `itemRender`
  // оболочка рисует индикаторы сама по `selectionMode`.
  const markerNode =
    !itemRender && !switchProp && isSelectionSingle && marker && !isParentNode && interactive ? (
      <div
        className={styles.markerContainer}
        data-test-id={TEST_IDS.baseItemMarker}
        data-checked={isChecked || undefined}
        data-disabled={disabled || undefined}
      />
    ) : undefined;

  const checkboxNode =
    !itemRender && !switchProp && isSelectionMultiple && interactive ? (
      <div className={styles.checkbox}>
        <Checkbox
          size={TOGGLE_SIZE_MAP[size]}
          disabled={disabled}
          tabIndex={-1}
          onChange={isParentNode ? handleCheckboxChange : undefined}
          checked={isChecked}
          data-test-id={TEST_IDS.baseItemCheckbox}
          onClick={handleCheckboxClick}
          indeterminate={indeterminate}
        />
      </div>
    ) : undefined;

  const switchControlNode =
    switchProp && interactive ? (
      <span className={styles.switchWrapper}>
        <Switch
          size={TOGGLE_SIZE_MAP[size]}
          disabled={disabled}
          checked={isChecked}
          data-test-id={TEST_IDS.baseItemSwitch}
          showIcon={showSwitchIcon}
        />
      </span>
    ) : undefined;

  const expandIconNode =
    !itemRender && !switchProp && expandIcon ? (
      // Интерактивный шеврон не получает роль и фокус намеренно: клавиатурный путь идёт
      // через строку, у неё же живёт `aria-expanded`. Лишний таб-стоп сломал бы порядок
      // фокуса списка, а озвучивать AT недостижимый с клавиатуры элемент незачем.
      <span
        className={styles.groupIndicator}
        data-open={open || undefined}
        data-interactive={Boolean(onExpandIconClick) || undefined}
        data-test-id={TEST_IDS.groupIndicator}
        onClick={onExpandIconClick && handleExpandIconClick}
        aria-hidden
      >
        {expandIcon}
      </span>
    ) : undefined;

  const isRowChecked = Boolean((isParentNode && (indeterminate || isChecked)) || (isChecked && !switchProp));

  let selectionMode: ValueOf<typeof MODE> = MODE.None;
  if (isSelectionMultiple) {
    selectionMode = MODE.Multiple;
  } else if (isSelectionSingle) {
    selectionMode = MODE.Single;
  }

  const itemJSX = itemRender ? (
    itemRender({
      id,
      content,
      contentNode,
      contentFromRender,
      beforeContent,
      afterContent,
      dragHandle: dragHandleNode,
      switchControl: switchControlNode,
      // Сырой слот: обёртку centeredWrapper/groupIndicator рисует кастомная оболочка.
      expandIcon: !switchProp && expandIcon ? expandIcon : undefined,
      selectionMode,
      disabled,
      inactive,
      checked: isRowChecked,
      open,
      isParentNode,
      size,
      level,
      className,
      itemRef: itemRef as RefObject<HTMLElement>,
      tabIndex,
      'data-test-id': dataTestId,
      style: { '--level': level },
      onClick: handleItemClick,
      onMouseDown: handleItemMouseDown,
      onKeyDown: handleItemKeyDown,
      onFocus: handleItemFocus,
      onExpandIconClick: onExpandIconClick ? handleExpandIconClick : undefined,
    })
  ) : (
    <div
      className={cn(commonStyles.itemWrapper, styles.innerWrapper, className)}
      data-size={size}
      data-inactive={inactive || undefined}
      data-disabled={disabled || undefined}
      data-variant={mode || undefined}
      data-checked={(isParentNode && isChecked) || (!isParentNode && isChecked && !switchProp) || undefined}
    >
      <span className={commonStyles.stateLayer} aria-hidden data-state={stateLayerState} />
      <li
        data-type='outside'
        role={'menuitem'}
        data-test-id={dataTestId}
        ref={itemRef as RefObject<HTMLLIElement>}
        className={cn(commonStyles.listItem, styles.droplistItem)}
        data-size={size}
        onClick={handleItemClick}
        onMouseDown={handleItemMouseDown}
        tabIndex={tabIndex}
        data-non-pointer={(inactive && !onClick) || undefined}
        data-variant={mode || undefined}
        data-open={open || undefined}
        aria-expanded={isParentNode ? Boolean(open) : undefined}
        onKeyDown={handleItemKeyDown}
        onFocus={handleItemFocus}
        style={{ '--level': level }}
        data-level-one={level === 1 || undefined}
        data-level-more-one={level > 1 || undefined}
        data-checked={(isParentNode && (indeterminate || isChecked)) || (isChecked && !switchProp) || undefined}
      >
        {dragHandleNode}

        {markerNode}

        {checkboxNode}

        {/* contentWrapper мастера: иконочные слоты и текст лежат в одном узле без gap —
            их разделяют только горизонтальные поля textContent. */}
        <div className={styles.contentWrapper}>
          {beforeContent && <div className={styles.beforeContent}>{beforeContent}</div>}
          {contentNode}
          {afterContent && <div className={styles.afterContent}>{afterContent}</div>}
        </div>

        {switchControlNode}

        {expandIconNode}
      </li>
    </div>
  );

  if (!itemWrapRender) {
    return itemJSX;
  }

  return itemWrapRender(itemJSX);
}
