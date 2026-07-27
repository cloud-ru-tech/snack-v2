import { Dropdown } from '@ds/dropdown';
import { useUncontrolledProp, useValueControl } from '@ds/utils';
import { ReactNode, useCallback, useRef } from 'react';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { useHandleOnKeyDown } from '../hooks';
import { AnyType, ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

export type CustomContentRenderProps<T = AnyType> = {
  /** Закрывает выпадающее меню и возвращает фокус на чип */
  closeDroplist(): void;
  /** Текущее значение компонента */
  value: T;
  /** Колбек смены значения */
  onChange?(value: T): void;
};

export type ChipChoiceCustomProps = ChipChoiceCommonProps & {
  /** Отображаемое значение */
  valueRender?(value: AnyType): ReactNode;
  /** Фактическое значение */
  value?: AnyType;
  /** Колбек смены значения */
  onChange?(value: AnyType): void;
  /** Контент выпадающего меню */
  content?(props: CustomContentRenderProps): ReactNode;
};

export function ChipChoiceCustom({
  size = SIZE.M,
  value: valueProp,
  onChange: onChangeProp,
  placement = 'bottom-start',
  widthStrategy = 'gte',
  content,
  valueRender,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  disabled,
  loading,
  ...rest
}: ChipChoiceCustomProps) {
  const localRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useValueControl<AnyType>({
    value: valueProp,
    onChange: onChangeProp,
  });

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (disabled || loading) {
        setOpen(false);
        return;
      }

      setOpen(isOpen);
    },
    [disabled, loading, setOpen],
  );

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, [setOpen]);

  return (
    <Dropdown
      trigger='click'
      widthStrategy={widthStrategy}
      placement={placement}
      outsideClick
      triggerRef={localRef}
      open={disabled || loading ? false : open}
      onOpenChange={handleOpenChange}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      content={typeof content === 'function' ? content({ closeDroplist, value, onChange: setValue }) : content}
    >
      <ChipChoiceBase
        {...rest}
        valueToRender={valueRender?.(value) ?? value}
        onClearButtonClick={onClearButtonClick}
        ref={localRef}
        value={value}
        disabled={disabled}
        loading={loading}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </Dropdown>
  );
}
