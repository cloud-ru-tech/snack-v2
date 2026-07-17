import { Button, ButtonProps, VIEW } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps } from '@ds/list';
import { useValueControl } from '@ds/utils';
import { useMemo } from 'react';

export type ButtonDroplistProps = {
  button:
    | (Omit<ButtonProps, 'appearance' | 'view'> & { buttonType?: 'filled' })
    | (Omit<ButtonProps, 'icon' | 'iconPosition' | 'appearance' | 'view'> & { buttonType?: 'function' });
  list: Pick<DroplistProps, 'items' | 'closeDroplistOnItemClick' | 'className' | 'open' | 'onOpenChange'>;
};

export function ButtonDroplist({ button, list }: ButtonDroplistProps) {
  const [open = false, onOpenChange] = useValueControl<boolean>({ onChange: list.onOpenChange, value: list.open });

  const Icon = open ? ChevronUpSVG : ChevronDownSVG;

  const buttonType = button.buttonType ?? 'function';

  const buttonProps: ButtonProps = useMemo(
    () =>
      buttonType === 'filled'
        ? { ...button, view: VIEW.Filled, appearance: 'primary' }
        : { ...button, view: VIEW.Function, appearance: 'neutral', icon: <Icon />, iconPosition: 'after' },
    [buttonType, button, Icon],
  );

  return (
    <Droplist
      {...list}
      open={open}
      onOpenChange={onOpenChange}
      selection={{
        mode: 'single',
        value: 'null',
      }}
      size='m'
    >
      <Button {...buttonProps} />
    </Droplist>
  );
}
