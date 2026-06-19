import { APPEARANCE, ButtonGroup, VIEW } from '@ds/button';
import cn from 'classnames';
import { isValidElement, ReactNode, useId } from 'react';

import { FOOTER_ACTIONS_ORIENTATION, TEST_IDS } from '../../constants';
import { Media } from '../../helperComponents';
import { BottomSheetMediaProps, BottomSheetProps } from '../../types';
import { BottomSheetCustom } from '../BottomSheetCustom';
import styles from './styles.module.scss';

function isMediaProps(value: BottomSheetMediaProps | ReactNode): value is BottomSheetMediaProps {
  return typeof value === 'object' && value !== null && !isValidElement(value) && 'src' in value && 'alt' in value;
}

/**
 * Высокоуровневая обёртка `@ds/bottom-sheet` с готовой анатомией:
 * media + header + body + footer + safeArea + dividers.
 *
 * Для ручной композиции используйте `BottomSheetCustom` с children и
 * namespace-компонентами `.Header` / `.Body` / `.Footer`.
 */
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
  footerActionsOrientation = FOOTER_ACTIONS_ORIENTATION.Horizontal,
  disclaimer,
  footer,
  withDividers = false,
  swipeEnabled = true,
  // safeArea НЕ деструктурируем — он уходит в `...rest` и обрабатывается в BottomSheetCustom
  // (env-паддинг на `.content`).
  className,
  ...rest
}: BottomSheetProps) {
  const hasHeader = Boolean(title || onBackButtonClick || actionButton || slotAfterHeadline || subHeadline);
  const hasMedia = media != null;
  const hasFullWidthMediaImage = hasMedia && isMediaProps(media) && (media.kind ?? 'image') === 'image';

  // Заголовок связывается с dialog'ом через aria-labelledby (accessible name). Если title нет —
  // имя должен задать потребитель через aria-label (прокидывается на dialog из `...rest`).
  const titleId = useId();

  // Footer: либо произвольный `footer`-ReactNode (приоритет), либо собранный из объектов-пропсов
  // `approveButton` / `cancelButton` / `additionalButton` + `disclaimer` — это именованные слоты
  // кнопок из Figma `bottomBar` (типизированный shortcut поверх `footer`-ReactNode, не legacy).
  // Кнопки собираются через `ButtonGroup` — как в Figma `bottomBar.buttonGroup`:
  //  - `horizontal` (ровно 2 кнопки) — `break`: ряд через space-between, secondary слева, primary
  //    справа, auto-width. Точное соответствие Figma. НЕ `filled` (равная ширина): Figma прижимает
  //    кнопки к краям через `justify-content: space-between`.
  //  - `vertical` (или 3 кнопки, или явный 'vertical') — стопка, full-width (для 3 действий + disclaimer).
  //  - 1 кнопка — всегда стопка из одной = full-width CTA (ряд из одной выглядел бы «потерянным»).
  // view/appearance имеют дефолты (primary→filled/primary, secondary→outline/neutral,
  // tertiary→simple/neutral), но переопределяемы из объекта пропсов.
  const actionCount = [approveButton, cancelButton, additionalButton].filter(Boolean).length;
  const isVerticalActions = footerActionsOrientation === FOOTER_ACTIONS_ORIENTATION.Vertical || actionCount !== 2;
  const hasActionButtons = actionCount > 0;
  const footerContent =
    footer ??
    (hasActionButtons || disclaimer ? (
      <>
        {hasActionButtons && (
          <ButtonGroup
            vertical={isVerticalActions}
            break={!isVerticalActions}
            primaryAction={approveButton ? { ...approveButton, 'data-test-id': TEST_IDS.footerApprove } : undefined}
            secondaryAction={
              cancelButton
                ? {
                    view: VIEW.Outline,
                    appearance: APPEARANCE.Neutral,
                    ...cancelButton,
                    'data-test-id': TEST_IDS.footerCancel,
                  }
                : undefined
            }
            tertiaryAction={
              additionalButton
                ? {
                    view: VIEW.Simple,
                    appearance: APPEARANCE.Neutral,
                    ...additionalButton,
                    'data-test-id': TEST_IDS.footerAdditional,
                  }
                : undefined
            }
          />
        )}
        {disclaimer && (
          <div className={styles.disclaimer} data-test-id={TEST_IDS.footerDisclaimer}>
            {disclaimer}
          </div>
        )}
      </>
    ) : null);
  const hasFooter = footerContent != null;

  return (
    <BottomSheetCustom
      {...rest}
      swipeEnabled={swipeEnabled}
      // Accessible name dialog'а: ссылаемся на заголовок, когда он есть. Пишем атрибут ТОЛЬКО при
      // наличии title (spread, а не `: undefined`) — иначе явный undefined затёр бы aria-label /
      // aria-labelledby, переданный потребителем через `...rest` для title-less sheet'а.
      {...(title ? { 'aria-labelledby': titleId } : {})}
      className={cn(className)}
    >
      {/* safeArea (env-паддинг под notch / home-indicator) живёт на `.content` в BottomSheetCustom —
          проп `safeArea` уходит туда через `...rest`. */}
      {/* Drag-индикатор (Handle) рендерит сам BottomSheetCustom при включённом свайпе. */}
      <div className={styles.root}>
        {hasMedia &&
          (isMediaProps(media) ? (
            <Media {...media} />
          ) : (
            // Произвольный ReactNode-media: тот же data-media-kind-контракт, что у props-media,
            // со значением 'custom' — чтобы слот всегда нёс атрибут независимо от формы media.
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
