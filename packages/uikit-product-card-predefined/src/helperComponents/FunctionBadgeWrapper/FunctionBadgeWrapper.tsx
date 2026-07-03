import { ReactNode, useState } from 'react';

import { FunctionBadgeContext } from '../../functionBadgeContext';
import styles from './styles.module.scss';

export type FunctionBadgeWrapperProps = {
  children: ReactNode;
  /** Всегда показывать FunctionBadge */
  alwaysVisible?: boolean;
};

export function FunctionBadgeWrapper({ children, alwaysVisible }: FunctionBadgeWrapperProps) {
  const [visible, setVisible] = useState(false);
  const show = alwaysVisible ? true : visible;

  return (
    <FunctionBadgeContext.Provider value={{ visible: show, setVisible }}>
      <div className={styles.wrapper} data-function-badge-wrapper data-visible={show || undefined} tabIndex={-1}>
        <div className={styles.functionBadge}>
          <div className={styles.functionRow}>{children}</div>
        </div>
      </div>
    </FunctionBadgeContext.Provider>
  );
}
