import { List, ListProps } from '@ds/list';
import { useMemo } from 'react';

import { useCalendarContext } from '../../hooks';
import { PresetItem, Range } from '../../types';

export type PresetsListProps = {
  /** Действие при выборе пресета */
  onChange(range: Range): void;
  /** Список пресетов */
  items: PresetItem[];
  /** CSS-класс */
  className?: string;
};

export function PeriodPresetsList({ items, onChange, className }: PresetsListProps) {
  const { size } = useCalendarContext();

  const listItems: ListProps['items'] = useMemo(
    () =>
      items.map(item => ({
        id: item.id,
        content: {
          label: item.label,
        },
        onClick() {
          onChange(item.range);
        },
        checked: false,
      })),
    [items, onChange],
  );

  return (
    <List
      className={className}
      size={size}
      items={listItems}
      scroll
      selection={{ mode: 'single', value: undefined }}
      hasListInFocusChain={false}
    />
  );
}
