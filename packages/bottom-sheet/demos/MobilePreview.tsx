import { BottomSheet, BottomSheetCustom } from '@ds/bottom-sheet';
import { PortalContextProvider } from '@ds/portal-context';
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useRef } from 'react';

import styles from './MobilePreview.module.scss';

type MobilePreviewProps = {
  children: ReactNode;
};

/**
 * В демо-рамке телефона отключаем `lockScroll` у sheet'а: `react-remove-scroll` иначе лочит скролл
 * всей страницы документации и компенсирует ширину скроллбара паддингом на `body` — из-за этого
 * layout документации «прыгает» при каждом открытии примера. Инжектим проп здесь (а не в исходниках
 * примеров), чтобы `?raw`-листинг оставался корректным для реального приложения: там модальный sheet
 * должен лочить фон, поэтому `lockScroll` остаётся дефолтным.
 */
function disableDocsScrollLock(children: ReactNode): ReactNode {
  return Children.map(children, child => {
    if (isValidElement(child) && (child.type === BottomSheet || child.type === BottomSheetCustom)) {
      const sheet = child as ReactElement<{ lockScroll?: boolean }>;
      if (sheet.props.lockScroll === undefined) {
        return cloneElement(sheet, { lockScroll: false });
      }
    }
    return child;
  });
}

/**
 * Демо-обвязка для docs: рендерит bottom-sheet в рамках имитации экрана телефона.
 *
 * Bottom-sheet — mobile-only, поэтому в документации он показывается внутри телефонной
 * рамки: safe-area работает portal-контейнером (через `PortalContextProvider`) и
 * containing block'ом для `position: fixed`, а класс `sn-comfort` фиксирует мобильную
 * density. Это только обёртка примера — сам компонент используется как обычно, внутри.
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
            <div className={styles.appContent}>{disableDocsScrollLock(children)}</div>
          </PortalContextProvider>
        </div>

        <div className={styles.homeIndicator} />
      </div>
    </div>
  );
}
