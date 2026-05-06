import { extractDataTestProps, extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { WIDTH } from '../../constants';
import { Segment } from '../../helperComponents';
import { useFocusControl } from '../../hooks';
import { IdType, Segment as SegmentType, SelectionPosition, Size, Width } from '../../types';
import styles from './styles.module.scss';

export type SegmentControlProps<Value extends IdType = IdType> = WithSupportProps<{
  /** Набор сегментов. */
  items: SegmentType<Value>[];
  /** Value выбранного сегмента. */
  value?: Value;
  /** ID выбранного по умолчанию сегмента (uncontrolled). */
  defaultValue?: Value;
  /** Колбек смены выбранного сегмента. */
  onChange?: (value: Value) => void;
  /** CSS-класс контейнера. */
  className?: string;
  /** Размер компонента. */
  size?: Size;
  /** Обводка. */
  outline?: boolean;
  /** Управление шириной компонента. */
  width?: Width;
  /** Имя поля (hidden input для формы). */
  name?: string;
}>;

export function SegmentControl<Value extends IdType>({
  defaultValue,
  size = 'm',
  className,
  onChange,
  items,
  value,
  outline,
  width = WIDTH.Auto,
  name,
  ...other
}: SegmentControlProps<Value>) {
  const [selected, setSelected] = useUncontrolledProp(value, defaultValue, onChange);
  const { focusableSegmentValue, onGetFocusable, onKeyDown } = useFocusControl({ selected, items });
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedElementRef = useRef<HTMLButtonElement | undefined>(undefined);
  const [selectionPosition, setSelectionPosition] = useState<SelectionPosition>();

  const updateSelectionPosition = useCallback((element: HTMLButtonElement | undefined = selectedElementRef.current) => {
    if (!element) {
      return;
    }
    selectedElementRef.current = element;
    setTimeout(() => {
      setSelectionPosition({
        top: element.offsetTop,
        left: element.offsetLeft,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => updateSelectionPosition());
    resizeObserver.observe(containerRef.current);

    const mutationObserver = new MutationObserver(() => updateSelectionPosition());
    mutationObserver.observe(containerRef.current, { childList: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateSelectionPosition]);

  const itemsJSX = useMemo(
    () =>
      items.map(props => (
        <div className={styles.segmentHolder} key={props.value} data-width={width}>
          <Segment
            {...props}
            size={size}
            onGetFocusable={onGetFocusable}
            selected={selected === props.value}
            onClick={() => setSelected(props.value)}
            focusable={focusableSegmentValue === props.value}
            onSelectionUpdated={updateSelectionPosition}
          />
        </div>
      )),
    [items, width, size, onGetFocusable, selected, focusableSegmentValue, updateSelectionPosition, setSelected],
  );

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      ref={containerRef}
      data-size={size}
      onKeyDown={onKeyDown}
      className={cn(styles.container, className)}
      role='radiogroup'
      data-outline={outline || undefined}
      data-width={width}
      {...extractDataTestProps(other)}
      {...extractSupportProps(other)}
    >
      {name && <input type='hidden' value={selected} name={name} />}
      <div data-size={size} style={selectionPosition} className={styles.selection} aria-hidden />
      {itemsJSX}
    </div>
  );
}
