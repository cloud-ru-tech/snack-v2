import { ArrowRightSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';
import cn from 'classnames';
import { ReactElement } from 'react';

import styles from './styles.module.scss';

type CardActionProps = {
  /** Текст кнопки действия */
  actionLabel: string;
  /** CSS-класс корневого элемента */
  className?: string;
};

export function CardAction({ actionLabel, className }: CardActionProps): ReactElement {
  return (
    <div className={cn(styles.root, className)}>
      <Typography as='span' variant='label' size='m'>
        {actionLabel}
      </Typography>

      <ArrowRightSVG className={styles.icon} />
    </div>
  );
}
