import { BAR_HIDE_STRATEGY, Scroll } from '@design-system/scroll';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { type ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type BodyProps = WithSupportProps<{
  /** Основной контент */
  content: ReactNode;
  /** CSS-класс для обёртки body */
  className?: string;
}>;

export function Body({ content, className, ...rest }: BodyProps) {
  return (
    <Scroll
      className={cn(styles.bodyWrapper, className)}
      data-test-id={TEST_IDS.body}
      barHideStrategy={BAR_HIDE_STRATEGY.Never}
      {...extractSupportProps(rest)}
    >
      {content}
    </Scroll>
  );
}
