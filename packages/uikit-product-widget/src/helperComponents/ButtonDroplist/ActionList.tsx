import { Button, VIEW } from '@ds/button';
import cn from 'classnames';
import { memo, MouseEvent } from 'react';

import { WidgetActionListEntry } from '../../types';
import styles from './styles.module.scss';

type ActionListProps = {
  items: WidgetActionListEntry[];
  className?: string;
  closeOnItemClick?: boolean;
  onItemClick?: () => void;
};

function isGroup(item: WidgetActionListEntry): item is Extract<WidgetActionListEntry, { type: 'group' }> {
  return 'type' in item && item.type === 'group';
}

function renderItem(item: WidgetActionListEntry, index: number, close: () => void) {
  if (isGroup(item)) {
    const visibleItems = item.items.filter(groupItem => !groupItem.hidden);

    if (!visibleItems.length) {
      return null;
    }

    return (
      <div className={styles.group} data-divider={item.divider || undefined} key={index}>
        {item.label && <div className={styles.groupLabel}>{item.label}</div>}
        {visibleItems.map((groupItem, groupIndex) => renderItem(groupItem, groupIndex, close))}
      </div>
    );
  }

  if (item.hidden) {
    return null;
  }

  return (
    <Button
      key={index}
      className={styles.item}
      view={VIEW.Simple}
      appearance='neutral'
      size='s'
      icon={item.beforeContent}
      label={item.content.option}
      disabled={item.disabled}
      fullWidth
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        close();
        item.onClick?.(event as MouseEvent<HTMLElement>);
      }}
    />
  );
}

function ActionListComponent({ items, className, closeOnItemClick = true, onItemClick }: ActionListProps) {
  const close = () => {
    if (closeOnItemClick) {
      onItemClick?.();
    }
  };

  return <div className={cn(styles.list, className)}>{items.map((item, index) => renderItem(item, index, close))}</div>;
}

export const ActionList = memo<ActionListProps>(ActionListComponent);
