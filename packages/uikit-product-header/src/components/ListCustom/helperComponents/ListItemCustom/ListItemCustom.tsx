import { isContentItem, isPrimitiveContent, ItemContentProps, MODE, TEST_IDS } from '@ds/list';
import { Checkbox } from '@ds/toggles';
import cn from 'classnames';
import { CSSProperties, RefObject } from 'react';

import { ContentWrapperCustom } from '../ContentWrapperCustom';
import styles from './styles.module.scss';
import { ListItemCustomProps } from './types';

function resolveStructuredContent(
  content: ListItemCustomProps['content'],
  contentFromRender?: boolean,
): ItemContentProps | undefined {
  if (contentFromRender) {
    return undefined;
  }
  if (isContentItem(content)) {
    return content;
  }
  if (isPrimitiveContent(content)) {
    return { label: content };
  }
  return undefined;
}

/**
 * Кастомная оболочка строки `List`/`Droplist` (Figma `listItemCustom`).
 * Маркер (single) и чекбокс (multiple) рисуются внутри по `selectionMode` / `checked` / `disabled`.
 */
export function ListItemCustom({
  selectionMode = MODE.None,
  checked = false,
  disabled = false,
  content,
  contentNode,
  contentFromRender,
  beforeContent,
  afterContent,
  dragHandle,
  switchControl,
  expandIcon,
  onExpandIconClick,
  inactive,
  open,
  isParentNode,
  level = 0,
  className,
  itemRef,
  tabIndex = -1,
  style,
  onClick,
  onMouseDown,
  onKeyDown,
  onFocus,
  'data-test-id': dataTestId,
}: ListItemCustomProps) {
  const structuredContent = resolveStructuredContent(content, contentFromRender);
  const isSingle = selectionMode === MODE.Single;
  const isMultiple = selectionMode === MODE.Multiple;

  // Figma: activated-подложка только у single + checked + !disabled; multiple всегда emptyNeutral.
  const stateLayerState =
    isSingle && checked && !disabled && !isParentNode && !switchControl
      ? 'activatedOnBackground'
      : 'emptyNeutralOnBackground';

  // Как в BaseItem: маркер не у parent/switch; чекбокс — только multiple без switch.
  const showMarker = isSingle && checked && !isParentNode && !switchControl;
  const showCheckbox = isMultiple && !switchControl;
  const expandIconInteractive = Boolean(onExpandIconClick);

  return (
    <div
      className={cn(styles.itemWrapper, className)}
      data-selection-mode={selectionMode}
      data-inactive={inactive || undefined}
      data-disabled={disabled || undefined}
      data-checked={checked || undefined}
      data-open={open || undefined}
    >
      {!disabled && <span className={styles.stateLayer} aria-hidden data-state={stateLayerState} />}
      <li
        data-type='outside'
        role='menuitem'
        data-test-id={dataTestId}
        ref={itemRef as RefObject<HTMLLIElement>}
        className={styles.listItem}
        onClick={onClick}
        onMouseDown={onMouseDown}
        tabIndex={tabIndex}
        data-non-pointer={(inactive && !onClick) || undefined}
        data-open={open || undefined}
        aria-expanded={isParentNode ? Boolean(open) : undefined}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        style={{ '--level': level, ...style } as CSSProperties}
        data-level-one={level === 1 || undefined}
        data-level-more-one={level > 1 || undefined}
        data-checked={checked || undefined}
        data-inactive={inactive || undefined}
        data-disabled={disabled || undefined}
      >
        {dragHandle}

        {showMarker && <div className={styles.marker} aria-hidden data-disabled={disabled || undefined} />}

        {showCheckbox && (
          <div className={styles.checkboxCenterWrapper}>
            <Checkbox size='xs' disabled={disabled} checked={checked} tabIndex={-1} />
          </div>
        )}

        <ContentWrapperCustom
          layout='item'
          beforeContent={beforeContent}
          afterContent={afterContent}
          label={structuredContent?.label}
          caption={structuredContent?.caption}
          description={structuredContent?.description}
          truncate={structuredContent?.truncate}
          contentNode={structuredContent ? undefined : contentNode}
          disabled={disabled}
        />

        {switchControl}

        {expandIcon && (
          <div className={styles.expandCenteredWrapper}>
            <span
              className={styles.groupIndicator}
              data-open={open || undefined}
              data-disabled={disabled || undefined}
              data-interactive={expandIconInteractive || undefined}
              data-test-id={TEST_IDS.groupIndicator}
              onClick={onExpandIconClick}
              aria-hidden
            >
              {expandIcon}
            </span>
          </div>
        )}
      </li>
    </div>
  );
}
