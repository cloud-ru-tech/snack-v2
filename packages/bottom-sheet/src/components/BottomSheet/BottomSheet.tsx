import cn from 'classnames';
import { isValidElement, ReactNode, useId } from 'react';

import { TEST_IDS } from '../../constants';
import { Media } from '../../helperComponents';
import { BottomSheetMediaProps, BottomSheetProps } from '../../types';
import { buildFooterActions } from '../../utils/buildFooterActions';
import { BottomSheetCustom } from '../BottomSheetCustom';
import styles from './styles.module.scss';

function isMediaProps(value: BottomSheetMediaProps | ReactNode): value is BottomSheetMediaProps {
  return typeof value === 'object' && value !== null && !isValidElement(value) && 'src' in value && 'alt' in value;
}

/** Обёртка `@ds/bottom-sheet` с готовой анатомией: media + header + body + footer + safeArea + dividers. */
export function BottomSheet({
  title,
  slotAfterHeadline,
  subHeadline,
  onBackButtonClick,
  actionButton,
  media,
  content,
  bodyPadding = true,
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation,
  disclaimer,
  footer,
  footerTestIds,
  withDividers = false,
  swipeEnabled = true,
  // safeArea уходит в `...rest` → BottomSheetCustom (env-паддинг на `.content`).
  className,
  ...rest
}: BottomSheetProps) {
  const hasHeader = Boolean(title || onBackButtonClick || actionButton || slotAfterHeadline || subHeadline);
  const hasMedia = media != null;
  const hasFullWidthMediaImage = hasMedia && isMediaProps(media) && (media.kind ?? 'image') === 'image';

  // aria-labelledby связывает заголовок с dialog'ом; без title имя задаёт потребитель через aria-label.
  const titleId = useId();

  // Footer: произвольный `footer`-ReactNode (приоритет) либо сборка из слотов кнопок через общий
  // `buildFooterActions` (тот же, что у Modal/Drawer, для adaptive-маппинга 1:1).
  const footerContent =
    footer ??
    buildFooterActions({
      approveButton,
      cancelButton,
      additionalButton,
      footerActionsOrientation,
      disclaimer,
      testIds: {
        approve: footerTestIds?.approve ?? TEST_IDS.footerApprove,
        cancel: footerTestIds?.cancel ?? TEST_IDS.footerCancel,
        additional: footerTestIds?.additional ?? TEST_IDS.footerAdditional,
        disclaimer: footerTestIds?.disclaimer ?? TEST_IDS.footerDisclaimer,
      },
      disclaimerClassName: styles.disclaimer,
      align: 'spread',
    });
  const hasFooter = footerContent != null;

  return (
    <BottomSheetCustom
      {...rest}
      swipeEnabled={swipeEnabled}
      // Атрибут пишем только при наличии title (spread, не `: undefined`) — иначе затёр бы
      // aria-label/aria-labelledby из `...rest` для title-less sheet'а.
      {...(title ? { 'aria-labelledby': titleId } : {})}
      className={cn(className)}
    >
      <div className={styles.root}>
        {hasMedia &&
          (isMediaProps(media) ? (
            <Media {...media} />
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
              slotAfterHeadline={slotAfterHeadline}
              subHeadline={subHeadline}
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
