import { Button, VIEW } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { KebabSVG } from '@ds/icons';
import { useValueControl } from '@ds/utils';
import { memo } from 'react';

import { TEST_IDS } from '../../constants';
import { ButtonKebabProps, WidgetLayoutType } from '../../types';
import { ActionList } from '../ButtonDroplist/ActionList';
import styles from './styles.module.scss';

type Props = ButtonKebabProps & {
  layoutType?: WidgetLayoutType;
};

function ButtonKebabComponent({ button, list }: Props) {
  const [open, setOpen] = useValueControl<boolean>({
    value: list.open,
    defaultValue: false,
    onChange: list.onOpenChange,
  });

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
      data-test-id={TEST_IDS.kebabDroplist}
    >
      <Button
        {...button}
        icon={<KebabSVG />}
        appearance='neutral'
        size='m'
        view={VIEW.Outline}
        data-test-id={TEST_IDS.kebabButton}
      />
    </Dropdown>
  );
}

export const ButtonKebab = memo<Props>(ButtonKebabComponent);
