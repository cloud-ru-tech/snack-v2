import { FooterActions, PopupMedia } from '@ds/popup-private';
import cn from 'classnames';
import { isValidElement, ReactNode, useId } from 'react';

import { TEST_IDS } from '../../constants';
import { BottomSheetMediaProps, BottomSheetProps } from '../../types';
import { BottomSheetCustom } from '../BottomSheetCustom';
import styles from './styles.module.scss';

function isMediaProps(value: BottomSheetMediaProps | ReactNode): value is BottomSheetMediaProps {
  return typeof value === 'object' && value !== null && !isValidElement(value) && 'src' in value && 'alt' in value;
}

/** Обёртка `@ds/bottom-sheet` с готовой анатомией: media + header + body + footer + safeArea + dividers. */
export function BottomSheet({
  title,
  slotAfterTitle,
  subtitle,
  slotSecondTitle,
  onBackButtonClick,
  actionButton,
  media,
  content,
  bodyPadding = true,
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation,
  footer,
  footerTestIds,
  withDividers = true,
  swipeEnabled = true,
  // safeArea уходит в `...rest` → BottomSheetCustom (env-паддинг на `.content`).
  className,
  ...rest
}: BottomSheetProps) {
  const hasHeader = Boolean(
    title || onBackButtonClick || actionButton || slotAfterTitle || subtitle || slotSecondTitle,
  );
  const hasMedia = media != null;
  const hasFullWidthMediaImage = hasMedia && isMediaProps(media) && (media.kind ?? 'image') === 'image';

  // aria-labelledby связывает заголовок с dialog'ом; без title имя задаёт потребитель через aria-label.
  const titleId = useId();

  // Footer: произвольный `footer`-ReactNode (приоритет) либо сборка из слотов кнопок через общий
  // `FooterActions` (тот же, что у Modal/Drawer, для adaptive-маппинга 1:1).
  const footerContent =
    footer ??
    (approveButton || cancelButton || additionalButton ? (
      <FooterActions
        surface='bottomSheet'
        size='l'
        approveButton={approveButton}
        cancelButton={cancelButton}
        additionalButton={additionalButton}
        footerActionsOrientation={footerActionsOrientation}
        testIds={{
          approve: footerTestIds?.approve ?? TEST_IDS.footerApprove,
          cancel: footerTestIds?.cancel ?? TEST_IDS.footerCancel,
          additional: footerTestIds?.additional ?? TEST_IDS.footerAdditional,
        }}
      />
    ) : null);
  const hasFooter = footerContent != null;

  return (
    <BottomSheetCustom
      {...rest}
      swipeEnabled={swipeEnabled}
      // Атрибут пишем только при наличии title (spread, не `: undefined`) — иначе затёр бы
      // aria-label/aria-labelledby из `...rest` для title-less sheet'а.
      {...(title ? { 'aria-labelledby': titleId } : {})}
      className={cn(className)}
      disableMotions={false}
    >
      <div className={styles.root}>
        {hasMedia &&
          (isMediaProps(media) ? (
            <PopupMedia {...media} />
          ) : (
            // ReactNode-media: тот же data-media-kind-контракт со значением 'custom'.
            <div data-test-id={TEST_IDS.media} data-media-kind='custom'>
              {media}
            </div>
          ))}

        <div className={cn(styles.contentBlock, hasFullWidthMediaImage && styles.contentBlockNoTopPadding)}>
          {hasHeader && (
            <BottomSheetCustom.Header
              title={title}
              titleId={titleId}
              slotAfterTitle={slotAfterTitle}
              subtitle={subtitle}
              slotSecondTitle={slotSecondTitle}
              onBackButtonClick={onBackButtonClick}
              actionButton={actionButton}
            />
          )}

          {withDividers && hasHeader && (
            <div className={styles.divider} data-test-id={TEST_IDS.dividerTop} aria-hidden />
          )}

          <BottomSheetCustom.Body bodyPadding={bodyPadding}>{content}</BottomSheetCustom.Body>

          {withDividers && hasFooter && (
            <div className={styles.divider} data-test-id={TEST_IDS.dividerBottom} aria-hidden />
          )}

          {hasFooter && <BottomSheetCustom.Footer>{footerContent}</BottomSheetCustom.Footer>}
        </div>
      </div>
    </BottomSheetCustom>
  );
}
