import { Button, VIEW } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { memo } from 'react';

import { TEST_IDS } from '../../constants';
import { ButtonKebabProps } from '../../types';
import styles from './styles.module.scss';

function ButtonKebabComponent({ button, list }: ButtonKebabProps) {
  const { items, className, closeDroplistOnItemClick = true, open, onOpenChange } = list;

  return (
    <Droplist
      items={items}
      className={className}
      open={open}
      onOpenChange={onOpenChange}
      closeDroplistOnItemClick={closeDroplistOnItemClick}
      placement='bottom-end'
      triggerClassName={styles.trigger}
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
    </Droplist>
  );
}

export const ButtonKebab = memo<ButtonKebabProps>(ButtonKebabComponent);
