import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { AiSuggestionSimple } from '../AiSuggestionSimple';
import { APPEARANCE, SIZE } from '../AiSuggestionSimple/constants';
import { Size } from '../AiSuggestionSimple/types';
import { AiSuggestionParentChip } from './AiSuggestionParentChip';
import { AnimatedExpandableItem, AnimatedTriggerWrap } from './animation/AnimatedExpandableItem';
import { TEST_IDS } from './constants';
import { AiSuggestionParentGroupProvider, useAiSuggestionParentGroup } from './context/AiSuggestionParentGroupContext';
import styles from './styles.module.scss';
import {
  AiSuggestionParentItem,
  AiSuggestionParentNestedItem,
  AiSuggestionParentProps,
  AiSuggestionParentSuggestionItem,
} from './types';
import { hasExclusiveParentGroup } from './utils/hasExclusiveParentGroup';
import { isNestedItem, isSuggestionItem } from './utils/itemGuards';

type AiSuggestionParentInternalProps = AiSuggestionParentProps & {
  /** Родительская группа раскрыта — управляет видимостью вложенной ветки */
  shown?: boolean;
};

type NestedAiSuggestionParentProps = {
  index: number;
  total: number;
  shown: boolean;
  node: AiSuggestionParentNestedItem;
  size: NonNullable<AiSuggestionParentProps['size']>;
  groupKey?: string;
  onItemClick?: AiSuggestionParentProps['onItemClick'];
};

type RenderSuggestionLeafProps = {
  item: AiSuggestionParentSuggestionItem;
  index: number;
  total: number;
  shown: boolean;
  size: Size;
  onLeafClick?(event: MouseEvent<HTMLButtonElement>): void;
};

function renderSuggestionLeaf({ item, index, total, shown, size, onLeafClick }: RenderSuggestionLeafProps) {
  const key = item.key ?? String(index);

  return (
    <AnimatedExpandableItem key={key} index={index} total={total} shown={shown}>
      <AiSuggestionSimple
        label={item.label}
        icon={item.icon}
        size={size}
        disabled={item.disabled}
        appearance={APPEARANCE.Primary}
        tabIndex={shown ? 0 : -1}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          item.onClick?.(event);
          onLeafClick?.(event);
        }}
      />
    </AnimatedExpandableItem>
  );
}

function useNestedExpandedState(groupKey: string | undefined, shown: boolean) {
  const group = useAiSuggestionParentGroup();
  const isGroupControlled = group !== null && groupKey !== undefined;
  const [localExpanded, setLocalExpanded] = useState(false);
  const expanded = isGroupControlled ? group.expandedKey === groupKey : localExpanded;

  useEffect(() => {
    if (!shown) {
      if (isGroupControlled && groupKey) {
        group.collapseKey(groupKey);
      } else {
        setLocalExpanded(false);
      }
    }
  }, [group, groupKey, isGroupControlled, shown]);

  const handleExpandedChange = useCallback(
    (next: boolean) => {
      if (isGroupControlled && groupKey) {
        group.requestExpand(groupKey);
        return;
      }

      setLocalExpanded(next);
    },
    [group, groupKey, isGroupControlled],
  );

  return { expanded, handleExpandedChange };
}

function NestedAiSuggestionParent({
  index,
  total,
  shown,
  node,
  size,
  groupKey,
  onItemClick,
}: NestedAiSuggestionParentProps) {
  const { expanded, handleExpandedChange } = useNestedExpandedState(groupKey, shown);
  const childShown = shown && expanded;
  const items = node.items ?? [];
  const nestedChildren = items.filter(isNestedItem);
  const leaves = items.filter(isSuggestionItem);
  const hasExclusiveGroup = hasExclusiveParentGroup(items);

  const nestedContent = (
    <>
      {nestedChildren.map((child, childIndex) => {
        const childKey = child.key ?? `${node.label}-${child.label ?? childIndex}`;

        return (
          <NestedAiSuggestionParent
            key={childKey}
            index={childIndex}
            total={nestedChildren.length}
            shown={childShown}
            node={child}
            size={size}
            groupKey={hasExclusiveGroup ? childKey : undefined}
            onItemClick={onItemClick}
          />
        );
      })}
      {leaves.map((leaf, leafIndex) =>
        renderSuggestionLeaf({
          item: leaf,
          index: leafIndex,
          total: leaves.length,
          shown: childShown,
          size,
        }),
      )}
    </>
  );

  return (
    <>
      <AnimatedExpandableItem index={index} total={total} shown={shown}>
        <AiSuggestionParentChip
          label={node.label}
          icon={node.icon}
          size={size}
          disabled={node.disabled}
          expanded={expanded}
          onExpandedChange={handleExpandedChange}
          tabIndex={shown ? 0 : -1}
        />
      </AnimatedExpandableItem>
      {hasExclusiveGroup ? (
        <AiSuggestionParentGroupProvider>{nestedContent}</AiSuggestionParentGroupProvider>
      ) : (
        nestedContent
      )}
    </>
  );
}

function wrapExclusiveItems(items: AiSuggestionParentItem[], content: ReactNode) {
  return hasExclusiveParentGroup(items) ? (
    <AiSuggestionParentGroupProvider>{content}</AiSuggestionParentGroupProvider>
  ) : (
    content
  );
}

export function AiSuggestionParent({
  label = 'Label text',
  icon,
  size = SIZE.S,
  disabled = false,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  items = [],
  onItemClick,
  className,
  shown: shownProp = true,
  ...rest
}: AiSuggestionParentInternalProps) {
  const [expanded, setExpanded] = useUncontrolledProp(expandedProp, defaultExpanded, onExpandedChange);
  const shown = shownProp;
  const childShown = shown && expanded;
  const totalItems = items.length;
  const hasExclusiveGroup = hasExclusiveParentGroup(items);
  const rootTestId = rest['data-test-id'] ?? TEST_IDS.root;

  useEffect(() => {
    if (!shown && expanded) {
      setExpanded(false);
    }
  }, [shown, expanded, setExpanded]);

  const handleExpandedChange = useCallback(
    (next: boolean) => {
      if (disabled) {
        return;
      }

      setExpanded(next);
    },
    [disabled, setExpanded],
  );

  const renderItem = (item: AiSuggestionParentItem, index: number) => {
    if (isNestedItem(item)) {
      const key = item.key ?? String(index);

      return (
        <NestedAiSuggestionParent
          key={key}
          index={index}
          total={totalItems}
          shown={childShown}
          node={item}
          size={size}
          groupKey={hasExclusiveGroup ? key : undefined}
          onItemClick={onItemClick}
        />
      );
    }

    return renderSuggestionLeaf({
      item,
      index,
      total: totalItems,
      shown: childShown,
      size,
      onLeafClick: event => onItemClick?.(index, event),
    });
  };

  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)} data-flatten data-test-id={rootTestId}>
      <AnimatedTriggerWrap>
        <AiSuggestionParentChip
          label={label}
          icon={icon}
          size={size}
          disabled={disabled}
          expanded={expanded}
          onExpandedChange={handleExpandedChange}
          tabIndex={shown ? undefined : -1}
        />
      </AnimatedTriggerWrap>
      {wrapExclusiveItems(items, items.map(renderItem))}
    </div>
  );
}
