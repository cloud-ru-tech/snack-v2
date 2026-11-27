import { Button, ButtonProps, VIEW } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps } from '@ds/list';
import { useValueControl } from '@ds/utils';

export type ButtonKebabProps = {
  button?: Omit<ButtonProps, 'label' | 'icon' | 'view'>;
  list: Pick<DroplistProps, 'items' | 'closeDroplistOnItemClick' | 'open' | 'onOpenChange' | 'className'>;
};

export function ButtonKebab({ button, list }: ButtonKebabProps) {
  const [open = false, onOpenChange] = useValueControl<boolean>({ onChange: list.onOpenChange, value: list.open });

  return (
    <Droplist
      {...list}
      open={open}
      onOpenChange={onOpenChange}
      selection={{
        mode: 'single',
        value: 'null',
      }}
      placement='bottom-end'
      size='m'
    >
      <Button {...button} view={VIEW.Outline} icon={<KebabSVG />} appearance='neutral' />
    </Droplist>
  );
}
