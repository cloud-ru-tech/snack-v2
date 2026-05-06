import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from '../TitleClickable/styles.module.scss';

export type TitleClickableIconProps = {
  /** Иконка (24×24). */
  icon: ReactNode;
  className?: string;
};

export function TitleClickableIcon({ icon, className }: TitleClickableIconProps) {
  return (
    <span data-test-id={TEST_IDS.icon} className={className ?? styles.iconSlot} aria-hidden>
      {icon}
    </span>
  );
}
