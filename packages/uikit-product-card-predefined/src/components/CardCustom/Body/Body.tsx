import { Size, useCardContext } from '@ds/card';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type BodyProps = WithSupportProps<{
  /** Произвольное содержимое тела карточки */
  children: ReactNode;
  /** CSS-класс */
  className?: string;
  /** Размер */
  size?: Size;
}>;

export function Body({ children, className, size: sizeProp, ...rest }: BodyProps) {
  const { radius } = useCardContext();
  const size = sizeProp ?? radius;

  return (
    <div className={cn(styles.body, className)} {...extractSupportProps(rest)} data-size={size}>
      {children}
    </div>
  );
}

Body.displayName = 'CardCustom.Body';
