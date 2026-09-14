import { Button } from '@ds/button';
import { ChevronDownSVG } from '@ds/icons/interface/system';
import { TruncateString } from '@ds/truncate-string';
import { isString, useLayoutEffect, useUncontrolledProp } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties, MouseEvent, ReactElement, ReactNode, useCallback, useId, useRef, useState } from 'react';

import {
  APPEARANCE,
  COLLAPSED_CONTENT_DEFAULT_MAX_LINES,
  COLLAPSED_CONTENT_MAX_HEIGHT_PX,
  TEST_IDS,
  TITLE_MAX_LINES,
} from './constants';
import { aiFieldRequestLocale } from './locale';
import styles from './styles.module.scss';
import { AiFieldRequestProps } from './types';
import { resolveCollapsedContentMetrics } from './utils/resolveCollapsedContentMetrics';

function isEllipsisOverflow(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
}

function renderTitle(title: ReactNode): ReactNode {
  if (isString(title)) {
    return <TruncateString text={title} maxLines={TITLE_MAX_LINES} hideTooltip />;
  }

  return title;
}

function renderContent(content: ReactNode, open: boolean, collapsedMaxLines: number): ReactNode {
  if (open || !isString(content)) {
    return content;
  }

  return <TruncateString text={content} maxLines={collapsedMaxLines} hideTooltip />;
}

export function AiFieldRequest({
  title,
  content,
  hint,
  appearance = APPEARANCE.Primary,
  open: openProp,
  onOpenChange,
  maxHeight = COLLAPSED_CONTENT_MAX_HEIGHT_PX,
  primaryAction,
  secondaryAction,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiFieldRequestProps): ReactElement {
  const { t } = aiFieldRequestLocale.useTranslations();
  const primaryActionLoading = primaryAction.loading ?? false;
  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const titleId = useId();
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const hasContent = content != null && content !== '';
  const contentIsString = isString(content);
  const [canExpand, setCanExpand] = useState(false);
  const [collapsedMaxHeightPx, setCollapsedMaxHeightPx] = useState(maxHeight);
  const [collapsedMaxLines, setCollapsedMaxLines] = useState(COLLAPSED_CONTENT_DEFAULT_MAX_LINES);

  const measureOverflow = useCallback(() => {
    const node = contentRef.current;
    if (!node) {
      setCanExpand(false);
      return;
    }

    const { maxHeightPx, maxLines } = resolveCollapsedContentMetrics(node, maxHeight);
    setCollapsedMaxHeightPx(current => (current === maxHeightPx ? current : maxHeightPx));
    setCollapsedMaxLines(current => (current === maxLines ? current : maxLines));

    // В раскрытом состоянии переполнения нет по определению — вердикт свёрнутого состояния
    // не трогаем, иначе кнопка «Скрыть» на кадр пропадёт при сворачивании и уронит фокус.
    if (open) {
      return;
    }

    setCanExpand(
      contentIsString
        ? isEllipsisOverflow(node.firstElementChild as HTMLElement | null)
        : node.scrollHeight > node.clientHeight + 1,
    );
  }, [contentIsString, open, maxHeight]);

  useLayoutEffect(() => {
    let cancelled = false;

    const run = () => {
      if (!cancelled) {
        measureOverflow();
      }
    };

    run();

    const fontsReady = typeof document !== 'undefined' ? document.fonts?.ready : undefined;
    if (fontsReady) {
      fontsReady.then(run).catch(() => undefined);
    }

    const node = contentRef.current;
    if (!node || typeof ResizeObserver === 'undefined') {
      return () => {
        cancelled = true;
      };
    }

    const observer = new ResizeObserver(run);
    observer.observe(node);
    const truncateRoot = node.firstElementChild;
    if (truncateRoot instanceof HTMLElement) {
      observer.observe(truncateRoot);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [measureOverflow, content, contentIsString, open]);

  const showExpandControl = open || canExpand;
  const primaryAppearance = appearance === APPEARANCE.Destructive ? 'critical' : 'primary';

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handlePrimaryActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (primaryActionLoading) {
      return;
    }

    primaryAction.onClick?.(event);
  };

  const handleSecondaryActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (primaryActionLoading) {
      return;
    }

    secondaryAction.onClick?.(event);
  };

  const contentStyle: CSSProperties | undefined = open ? undefined : { maxHeight: `${collapsedMaxHeightPx}px` };

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-appearance={appearance}
      data-open={open || undefined}
      data-loading={primaryActionLoading || undefined}
      data-test-id={dataTestId}
    >
      <div className={styles.card} role='region' aria-labelledby={titleId} data-test-id={TEST_IDS.card}>
        <div className={styles.headline}>
          <div className={styles.labelContainer}>
            <div
              id={titleId}
              className={cn(styles.title, !isString(title) && styles.titleClamp)}
              data-test-id={TEST_IDS.title}
            >
              {renderTitle(title)}
            </div>
          </div>
        </div>

        <div
          ref={contentRef}
          id={contentId}
          className={styles.content}
          style={contentStyle}
          data-open={open || undefined}
          data-test-id={TEST_IDS.content}
        >
          {renderContent(content, open, collapsedMaxLines)}
        </div>

        <div className={styles.footer}>
          {hasContent ? (
            <Button
              view='function'
              appearance='primary'
              size='s'
              label={open ? t('showLess') : t('showMore')}
              icon={<ChevronDownSVG className={styles.expandIcon} data-open={open || undefined} />}
              iconPosition='after'
              minWidth={false}
              className={cn(styles.expand, !showExpandControl && styles.expandHidden)}
              data-test-id={TEST_IDS.expand}
              aria-controls={contentId}
              aria-expanded={open}
              aria-hidden={!showExpandControl || undefined}
              tabIndex={showExpandControl ? 0 : -1}
              onClick={handleToggleOpen}
            />
          ) : null}

          <div className={styles.actions}>
            <Button
              view='outline'
              appearance='neutral'
              size='s'
              label={secondaryAction.label}
              disabled={primaryActionLoading}
              data-test-id={TEST_IDS.secondaryAction}
              onClick={handleSecondaryActionClick}
            />
            <Button
              view='filled'
              appearance={primaryAppearance}
              size='s'
              label={primaryAction.label}
              loading={primaryActionLoading}
              data-test-id={TEST_IDS.primaryAction}
              onClick={handlePrimaryActionClick}
            />
          </div>
        </div>
      </div>

      {hint != null && hint !== '' ? (
        <div className={styles.hint} data-test-id={TEST_IDS.hint}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}
