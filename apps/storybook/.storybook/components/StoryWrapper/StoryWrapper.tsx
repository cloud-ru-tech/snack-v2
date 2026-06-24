import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import styles from './styles.module.scss';

export const StoryWrapper = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => (
  <div ref={ref} className={cn(styles.wrapper, 'sb-story-wrapper')}>
    <div className={cn(styles.content)}>{children}</div>
  </div>
));
