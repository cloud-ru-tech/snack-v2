import { ReactNode } from 'react';

import styles from './ResizableWrapper.module.scss';

export type ResizableWrapperProps = {
  children: ReactNode;
};

export const ResizableWrapper = ({ children }: ResizableWrapperProps) => (
  <div className={styles.wrapper}>{children}</div>
);
