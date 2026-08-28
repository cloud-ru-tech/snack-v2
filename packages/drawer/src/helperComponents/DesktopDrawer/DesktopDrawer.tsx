import cn from 'classnames';

import { NESTED_DRAWER_PUSH_DISTANCE } from '../../components/Drawer/constants';
import styles from '../../components/Drawer/styles.module.scss';
import { DrawerProps } from '../../components/Drawer/types';
import { DrawerCustom } from '../../components/DrawerCustom';
import { TEST_IDS } from '../../constants';

/** Desktop-поверхность Drawer'а: панель (`DrawerCustom`) с пресетной разметкой. Internal. */
export function DesktopDrawer({
  content,
  media,
  title,
  slotAfterTitle,
  slotSecondTitle,
  subtitle,
  onBackButtonClick,
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation,
  footer,
  nestedDrawer,
  contentRef,
  // `withDividers` — mobile-only (мастер bottomSheet): молча уходит в `rest` и отбрасывается фреймом.
  className,
  ...rest
}: DrawerProps) {
  const showHeader = Boolean(title || subtitle || slotAfterTitle || slotSecondTitle);
  // Произвольный `footer` приоритетнее кнопок-слотов; раскладку слотов делает сам `DrawerCustom.Footer`.
  const hasFooter = Boolean(footer || approveButton || cancelButton || additionalButton);

  return (
    <DrawerCustom
      {...rest}
      resizable={undefined}
      className={cn(styles.drawer, className)}
      push={Boolean(nestedDrawer) && { distance: NESTED_DRAWER_PUSH_DISTANCE }}
    >
      {media}

      {showHeader && (
        <DrawerCustom.Header
          title={title}
          slotAfterTitle={slotAfterTitle}
          slotSecondTitle={slotSecondTitle}
          subtitle={subtitle}
          onBackButtonClick={onBackButtonClick}
          // Сохраняем публичный контракт test-id'ов drawer'а поверх общего `PopupHeader`.
          // slotAfterTitle НЕ переопределяем: id тултипа ставит сам потребитель на своём span.
          testIds={{
            header: TEST_IDS.header,
            title: TEST_IDS.title,
            subtitle: TEST_IDS.subtitle,
          }}
        />
      )}

      <DrawerCustom.Body data-test-id={TEST_IDS.body} innerRef={contentRef} content={content} />

      {hasFooter && (
        <DrawerCustom.Footer
          data-test-id={TEST_IDS.footer}
          approveButton={footer ? undefined : approveButton}
          cancelButton={footer ? undefined : cancelButton}
          additionalButton={footer ? undefined : additionalButton}
          footerActionsOrientation={footerActionsOrientation}
        >
          {footer}
        </DrawerCustom.Footer>
      )}

      {nestedDrawer}
    </DrawerCustom>
  );
}
