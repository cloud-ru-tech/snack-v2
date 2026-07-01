import { Button, ButtonProps } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';
import { Droplist, DroplistProps } from '@ds/list';
import { useValueControl, WithSupportProps } from '@ds/utils';

import { TEST_IDS } from '../../constants';

type ButtonDropdownSize = NonNullable<ButtonProps['size']> | 'xs';

type ButtonDropdownTriggerProps = WithSupportProps<
  Omit<ButtonProps, 'icon' | 'iconPosition' | 'view' | 'size'> & {
    /** Размер триггера; для `xs` применяется кнопка `s`. */
    size?: ButtonDropdownSize;
    /** Класс триггерной кнопки. */
    className?: string;
    /** Контролируемое состояние раскрытия. */
    open?: boolean;
    /** Колбэк изменения раскрытия. */
    onOpenChange?: (open: boolean) => void;
  }
>;

type ButtonDropdownDroplistConfig = Pick<
  DroplistProps,
  'items' | 'closeDroplistOnItemClick' | 'placement' | 'triggerClassName' | 'closeOnPopstate'
>;

export type ButtonDropdownProps = ButtonDropdownTriggerProps & ButtonDropdownDroplistConfig;

export function ButtonDropdown({
  size = 's',
  appearance = 'neutral',
  className,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  items,
  closeDroplistOnItemClick,
  placement,
  triggerClassName,
  closeOnPopstate,
  ...buttonProps
}: ButtonDropdownProps) {
  const [open, onOpenChange] = useValueControl({ value: openProp, onChange: onOpenChangeProp });

  const Icon = open ? ChevronUpSVG : ChevronDownSVG;
  const buttonSize: ButtonProps['size'] = size === 'xs' ? 's' : size;
  const droplistSize = size === 'xs' ? 's' : size;

  const trigger = (
    <Button
      view='function'
      appearance={appearance}
      size={buttonSize}
      className={className}
      iconPosition='after'
      data-pressed={open || undefined}
      icon={<Icon />}
      {...buttonProps}
    />
  );

  return (
    <Droplist
      data-test-id={TEST_IDS.droplist}
      items={items}
      open={open}
      onOpenChange={onOpenChange}
      closeDroplistOnItemClick={closeDroplistOnItemClick}
      placement={placement}
      triggerClassName={triggerClassName}
      closeOnPopstate={closeOnPopstate}
      size={droplistSize}
      // Desktop-поведение триггер-кнопки: открытие по клику, popover не уже кнопки.
      trigger='click'
      widthStrategy='gte'
    >
      {trigger}
    </Droplist>
  );
}
