import { Button, ICON_POSITION, VIEW } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { useValueControl } from '@ds/utils';
import { memo, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { ButtonDroplistProps, WidgetLayoutType } from '../../types';
import { ActionList } from './ActionList';
import styles from './styles.module.scss';

type Props = ButtonDroplistProps & {
  layoutType?: WidgetLayoutType;
};

function ButtonDroplistComponent({ button, list }: Props) {
  const { buttonType: buttonTypeProp, ...buttonRest } = button;
  const [open, setOpen] = useValueControl<boolean>({
    value: list.open,
    defaultValue: false,
    onChange: list.onOpenChange,
  });

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

  //Todo переделать на AdaptiveDropDown
  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      placement='bottom-end'
      triggerClassName={styles.trigger}
      content={
        <ActionList
          items={list.items}
          className={list.className}
          closeOnItemClick={list.closeDroplistOnItemClick}
          onItemClick={() => setOpen(false)}
        />
      }
      data-test-id={TEST_IDS.dropdown}
    >
      <Button {...buttonProps} />
    </Dropdown>
  );
}

export const ButtonDroplist = memo<Props>(ButtonDroplistComponent);
