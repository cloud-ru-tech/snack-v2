import {
  BottomSheetActionButton,
  FooterActions,
  FooterActionsOrientation,
  OVERLAY_SURFACE,
  SheetBody,
  SheetFooter,
  SheetFooterProps,
  SheetHeader,
  SheetHeaderProps,
  useOverlaySurface,
} from '@ds/bottom-sheet';

import { TEST_IDS } from '../constants';
import { DrawerBody, DrawerBodyProps } from './DrawerBody';
import styles from './styles.module.scss';

// Header и Footer surface-aware реализует сам `PopupHeader`/`PopupFooter` (`SheetHeader`/`SheetFooter`):
// он читает `OverlaySurfaceProvider` и рисует window-раскладку на drawer, bottomSheet — на sheet.
// Свап остаётся только для Body (desktop-frame vs sheet).
export type DialogHeaderProps = SheetHeaderProps;
export type DialogBodyProps = DrawerBodyProps;
export type DialogFooterProps = SheetFooterProps & {
  /** Основная кнопка. Задаёт штатную раскладку футера — вместо `children`. */
  approveButton?: BottomSheetActionButton;
  /** Кнопка отмены. */
  cancelButton?: BottomSheetActionButton;
  /** Дополнительная (третья) кнопка. */
  additionalButton?: BottomSheetActionButton;
  /** Ориентация кнопок при ровно двух действиях. */
  footerActionsOrientation?: FooterActionsOrientation;
};

/**
 * Шапка панели вместе с верхней safe-area.
 *
 * Отступ лежит здесь, а не во фрейме: иначе его теряет ручная композиция из
 * `DrawerCustom.Header/Body/Footer`. На `sheet` не нужен — там свой `padding-top` в токенах.
 */
export function DialogHeader(props: DialogHeaderProps) {
  const isSheet = useOverlaySurface() === OVERLAY_SURFACE.Sheet;

  return (
    <>
      {!isSheet && <div className={styles.safeAreaTop} />}
      <SheetHeader {...props} />
    </>
  );
}

/**
 * Футер панели вместе с зазором от `Body` (нижняя safe-area; на `sheet` его даёт сам мастер).
 *
 * Кнопки-слоты раскладывает `FooterActions`. `children` — для нестандартного содержимого:
 * раскладку в этом случае обеспечивает потребитель.
 */
export function DialogFooter({
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation,
  children,
  ...rest
}: DialogFooterProps) {
  const isSheet = useOverlaySurface() === OVERLAY_SURFACE.Sheet;
  const hasActions = Boolean(approveButton || cancelButton || additionalButton);

  return (
    <>
      {!isSheet && <div className={styles.safeAreaBottom} />}
      <SheetFooter {...rest}>
        {hasActions ? (
          <FooterActions
            surface={isSheet ? 'bottomSheet' : 'window'}
            size='l'
            approveButton={approveButton}
            cancelButton={cancelButton}
            additionalButton={additionalButton}
            footerActionsOrientation={footerActionsOrientation}
            testIds={{
              approve: TEST_IDS.footerApprove,
              cancel: TEST_IDS.footerCancel,
              additional: TEST_IDS.footerAdditional,
            }}
          />
        ) : (
          children
        )}
      </SheetFooter>
    </>
  );
}

export function DialogBody(props: DialogBodyProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetBody {...props} /> : <DrawerBody {...props} />;
}
