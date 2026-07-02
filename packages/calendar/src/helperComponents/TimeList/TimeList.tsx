import { BaseItemProps, getDefaultItemId, ItemProps, List, ListProps } from '@ds/list';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { createRef, RefObject, useImperativeHandle, useMemo } from 'react';

import { useCalendarContext } from '../../hooks';
import { OnKeyDownGetter } from '../../types';
import styles from './styles.module.scss';

export type TimeListProps = WithSupportProps<{
  numberOfItems: number;
  value?: number;
  onChange(value: number): void;
  className?: string;
  onKeyDownGetter?: OnKeyDownGetter;
  keyboardNavigationRef?: ListProps['keyboardNavigationRef'];
  navigationStartRef?: RefObject<{ focus(): void }>;
}>;

export function TimeList({
  numberOfItems,
  value,
  onChange,
  className,
  onKeyDownGetter,
  keyboardNavigationRef,
  navigationStartRef,
  'data-test-id': dataTestId,
  ...rest
}: TimeListProps) {
  const { size } = useCalendarContext();

  const itemsRef = useMemo(
    () => new Array(numberOfItems).fill(null).map(() => createRef<HTMLElement>()),
    [numberOfItems],
  );

  useImperativeHandle(
    navigationStartRef,
    () => ({
      focus: () => {
        keyboardNavigationRef?.current?.focusItem(getDefaultItemId(value ? value : 0));
      },
    }),
    [keyboardNavigationRef, value],
  );

  const items = useMemo<ItemProps[]>(
    () =>
      new Array(numberOfItems).fill(undefined).map((_, index) => ({
        id: index,
        content: (
          <span className={styles.label} data-size={size}>
            {String(index).padStart(2, '0')}
          </span>
        ),
        'data-test-id': `${dataTestId}-${index}`,
        onKeyDown: onKeyDownGetter?.(index),
        itemRef: itemsRef[index] as BaseItemProps['itemRef'],
      })),
    [dataTestId, itemsRef, numberOfItems, onKeyDownGetter, size],
  );

  return (
    <List
      {...extractSupportProps(rest)}
      size={size}
      items={items}
      scroll
      keyboardNavigationRef={keyboardNavigationRef}
      selection={{ mode: 'single', value, onChange: id => onChange(Number(id)) }}
      className={className}
      hasListInFocusChain={false}
      scrollToSelectedItem
      marker={false}
    />
  );
}
