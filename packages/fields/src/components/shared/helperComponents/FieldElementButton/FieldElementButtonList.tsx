import { Droplist, DroplistProps } from '@ds/list';
import { useValueControl } from '@ds/utils';
import { forwardRef, KeyboardEvent } from 'react';

import { FieldElementButton, FieldElementButtonProps } from './FieldElementButton';

/**
 * Конфигурация встроенного выпадающего списка (действия / выбор) на `@ds/list` `Droplist`.
 */
export type FieldElementDroplistProps = Pick<
  DroplistProps,
  | 'items'
  | 'pinTop'
  | 'pinBottom'
  | 'selection'
  | 'search'
  | 'scroll'
  | 'placement'
  | 'widthStrategy'
  | 'virtualized'
  | 'closeDroplistOnItemClick'
> & {
  /** Контролируемое состояние раскрытия */
  open?: boolean;
  /** Колбек смены состояния раскрытия */
  onOpenChange?(open: boolean): void;
};

export type FieldElementButtonListProps = Omit<FieldElementButtonProps, 'open' | 'withDropdownList'> & {
  /** Параметры встроенного выпадающего списка */
  droplist: FieldElementDroplistProps;
};

/**
 * Кнопка-слот поля со встроенным выпадающим списком на `@ds/list` `Droplist`.
 *
 * Триггером выступает `FieldElementButton`, список раскрывается кликом (`trigger='click'`),
 * шеврон следует за фактическим `open`, навигация ArrowDown/ArrowUp передаётся `Droplist`'ом
 * в триггер.
 */
export const FieldElementButtonList = forwardRef<HTMLButtonElement, FieldElementButtonListProps>(
  function FieldElementButtonList({ droplist, size, onKeyDown, ...buttonProps }, ref) {
    const { open: openProp, onOpenChange, closeDroplistOnItemClick, ...droplistProps } = droplist;

    const [open = false, setOpen] = useValueControl<boolean>({
      value: openProp,
      defaultValue: false,
      onChange: onOpenChange,
    });

    return (
      <Droplist
        {...droplistProps}
        trigger='click'
        size={size}
        open={open}
        onOpenChange={setOpen}
        closeDroplistOnItemClick={closeDroplistOnItemClick ?? true}
      >
        <FieldElementButton
          {...buttonProps}
          ref={ref}
          size={size}
          withDropdownList
          open={open}
          onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => onKeyDown?.(event)}
        />
      </Droplist>
    );
  },
);
