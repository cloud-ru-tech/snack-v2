import { PortalContextProvider } from '@ds/portal-context';
import { ReactNode, useRef } from 'react';

import styles from './MobilePreview.module.scss';

type MobilePreviewProps = {
  children: ReactNode;
};

/**
 * Демо-обвязка для docs: рендерит mobile-toolbar в рамках имитации экрана телефона.
 *
 * Bottom-sheet и droplist — mobile-only, поэтому в документации они показываются внутри
 * телефонной рамки: safe-area работает portal-контейнером (через `PortalContextProvider`) и
 * containing block'ом для `position: fixed`, а класс `sn-comfort` фиксирует мобильную density.
 */
export function MobilePreview({ children }: MobilePreviewProps) {
  const safeAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.notch} />
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>

        <div ref={safeAreaRef} className={`${styles.safeArea} sn-comfort`}>
          <PortalContextProvider root={safeAreaRef}>
            <div className={styles.appContent}>{children}</div>
          </PortalContextProvider>
        </div>

        <div className={styles.homeIndicator} />
      </div>
    </div>
  );
}
