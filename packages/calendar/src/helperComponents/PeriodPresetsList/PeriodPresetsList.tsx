import { useMemo } from 'react';

import { List, ListProps } from '@snack-uikit/list';

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
          option: item.label,
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
