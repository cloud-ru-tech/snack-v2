import { Scroll } from '@design-system/scroll';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { useDrawerCustomLayout } from '../../components/DrawerCustom/layoutContext';
import styles from './styles.module.scss';

export type DrawerBodyProps = WithSupportProps<{
  /** Контент */
  content: ReactNode;
  /** CSS-класс */
  className?: string;
}>;

/** Вспомогательный компонент для добавления "тела" в DrawerCustom */
export function DrawerBody({ content, className, ...rest }: DrawerBodyProps) {
  const { heightAutoVertical } = useDrawerCustomLayout();

  return (
    <Scroll
      size='m'
      barHideStrategy='never'
      className={cn(styles.body, heightAutoVertical && styles.bodyHeightAuto, className)}
      {...extractSupportProps(rest)}
    >
      {content}
    </Scroll>
  );
}
