import { Button, ICON_POSITION, VIEW } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { useUncontrolledProp } from '@ds/utils';
import { memo, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { ButtonDroplistProps } from '../../types';
import styles from './styles.module.scss';

function ButtonDroplistComponent({ button, list }: ButtonDroplistProps) {
  const { buttonType: buttonTypeProp, ...buttonRest } = button;
  const { items, className, closeDroplistOnItemClick = true, open: openProp, onOpenChange } = list;
  // Стрелка триггера смотрит вверх на открытом списке, поэтому состояние нужно и здесь,
  // а не только внутри Droplist.
  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);

  const Icon = open ? ChevronUpSVG : ChevronDownSVG;
  const buttonType = buttonTypeProp ?? 'function';
  const buttonProps = useMemo(
    () =>
      buttonType === 'filled'
        ? { ...buttonRest, view: VIEW.Filled }
        : {
            ...buttonRest,
            view: VIEW.Function,
            appearance: 'neutral' as const,
            icon: <Icon />,
            iconPosition: ICON_POSITION.After,
          },
    [Icon, buttonRest, buttonType],
  );

  return (
    <Droplist
      items={items}
      className={className}
      open={open}
      onOpenChange={setOpen}
      closeDroplistOnItemClick={closeDroplistOnItemClick}
      placement='bottom-end'
      triggerClassName={styles.trigger}
      data-test-id={TEST_IDS.dropdown}
    >
      <Button {...buttonProps} />
    </Droplist>
  );
}

export const ButtonDroplist = memo<ButtonDroplistProps>(ButtonDroplistComponent);
