import { useCardContext } from '@ds/card';
import { Typography, VARIANT } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type FooterCallToActionProps = WithSupportProps<{
  /** Лейбл */
  label: string;
  /** Иконка */
  icon?: ReactNode;
  /** CSS-класс для элемента с контентом */
  className?: string;
}>;

export function FooterCallToAction({ label, icon, className, ...rest }: FooterCallToActionProps) {
  const { radius } = useCardContext();

  return (
    <div className={cn(styles.callToAction, className)} data-size={radius} {...extractSupportProps(rest)}>
      <Typography as='span' variant={VARIANT.label} size='l' className={styles.label}>
        {label}
      </Typography>
      {icon && <span className={styles.icon}>{icon}</span>}
    </div>
  );
}

FooterCallToAction.displayName = 'CardCustom.Footer.CallToAction';
