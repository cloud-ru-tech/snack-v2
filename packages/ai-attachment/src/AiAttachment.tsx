import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { AiButtonClose, SIZE as CLOSE_SIZE } from '@ds/ai-button-close';
import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { FileSVG, UpdateSVG } from '@ds/icons/interface/system';
import { Spinner } from '@ds/loader';
import { ChildThemeProvider, PLATFORM } from '@ds/theme';
import { Tooltip } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import cn from 'classnames';
import { KeyboardEvent, MouseEvent, ReactElement, useCallback, useRef } from 'react';

import { ATTACHMENT_STATE, ATTACHMENT_TYPE, TEST_IDS } from './constants';
import { aiAttachmentLocale } from './locale';
import styles from './styles.module.scss';
import { AiAttachmentProps } from './types';

/** Плитка закреплена на платформе webDesktop на обеих раскладках (AT-7.1). */
const PINNED_THEME = { platform: PLATFORM.WebDesktop };
const TOOLTIP_DELAY = 300;

export function AiAttachment({
  type = ATTACHMENT_TYPE.Image,
  state = ATTACHMENT_STATE.Default,
  src,
  fileName,
  icon,
  tooltip,
  onRemove,
  onRetry,
  onClick,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiAttachmentProps): ReactElement {
  const { t } = aiAttachmentLocale.useTranslations();
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const isFile = type === ATTACHMENT_TYPE.File;
  const rootRef = useRef<HTMLDivElement>(null);
  const showPreview = !isFile && state !== ATTACHMENT_STATE.Error && Boolean(src);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  const handleRemove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove?.();
    },
    [onRemove],
  );

  const handleRetry = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRetry?.();
    },
    [onRetry],
  );

  const tile = (
    <div
      {...rest}
      ref={rootRef}
      className={cn(styles.root, className)}
      data-type={type}
      data-state={state}
      data-mobile={isMobile || undefined}
      data-interactive={onClick ? true : undefined}
      data-test-id={dataTestId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      <div className={styles.wrapper}>
        {showPreview && <img className={styles.preview} src={src} alt={fileName ?? ''} />}
        {isFile && state === ATTACHMENT_STATE.Default && (
          <span className={styles.typeIcon} aria-hidden>
            {icon ?? <FileSVG />}
          </span>
        )}
        {isFile && fileName && (
          <span className={styles.fileName}>
            <TruncateString variant='middle' text={fileName} />
          </span>
        )}
      </div>

      {state === ATTACHMENT_STATE.Loading && (
        <span className={styles.center} data-test-id={TEST_IDS.loader}>
          <Spinner size='m' />
        </span>
      )}

      {state === ATTACHMENT_STATE.Error && (
        <span className={styles.center}>
          <Button
            view={VIEW.Simple}
            appearance={APPEARANCE.Critical}
            size={SIZE.M}
            icon={<UpdateSVG />}
            aria-label={t('retry')}
            data-test-id={TEST_IDS.retry}
            onClick={handleRetry}
          />
        </span>
      )}

      <span className={styles.close}>
        <AiButtonClose
          size={isMobile ? CLOSE_SIZE.S : CLOSE_SIZE.Xs}
          outline
          aria-label={t('remove')}
          data-test-id={TEST_IDS.remove}
          onClick={handleRemove}
        />
      </span>
    </div>
  );

  return (
    <ChildThemeProvider value={PINNED_THEME} rootRef={rootRef}>
      {isMobile || !tooltip ? (
        tile
      ) : (
        <Tooltip tip={tooltip} hoverDelayOpen={TOOLTIP_DELAY} disableSpanWrapper>
          {tile}
        </Tooltip>
      )}
    </ChildThemeProvider>
  );
}
