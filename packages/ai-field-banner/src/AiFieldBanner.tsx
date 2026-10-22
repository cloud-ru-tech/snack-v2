import { AiButtonClose } from '@ds/ai-button-close';
import { AlertButton } from '@ds/alert';
import cn from 'classnames';
import { ReactElement } from 'react';

import { TEST_IDS, VARIANT } from './constants';
import { useAiFieldBannerSize } from './hooks';
import styles from './styles.module.scss';
import { AiFieldBannerProps } from './types';

export function AiFieldBanner({
  className,
  variant = VARIANT.Information,
  size: sizeProp,
  layoutPresets,
  content,
  bottomContent,
  icon,
  actionLabel,
  onActionClick,
  onClose,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiFieldBannerProps): ReactElement {
  const size = useAiFieldBannerSize(sizeProp, layoutPresets);
  const showMainLine = Boolean(content) || Boolean(icon) || Boolean(actionLabel) || Boolean(onClose);
  const hasBottomContent = Boolean(bottomContent);

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-bottom-content={hasBottomContent || undefined}
      data-test-id={dataTestId}
    >
      {showMainLine && (
        <div className={styles.mainLine} data-size={size} data-test-id={TEST_IDS.mainLine}>
          {icon && (
            <span className={styles.icon} data-size={size} data-test-id={TEST_IDS.icon}>
              {icon}
            </span>
          )}

          <div className={styles.description} data-size={size} data-test-id={TEST_IDS.content}>
            {content}
          </div>

          {actionLabel && (
            <AlertButton
              label={actionLabel}
              size={size}
              variant='onColor'
              className={styles.action}
              data-test-id={TEST_IDS.action}
              onClick={onActionClick}
            />
          )}

          {onClose && <AiButtonClose size={size} data-test-id={TEST_IDS.close} onClick={onClose} />}
        </div>
      )}

      {hasBottomContent && (
        <div className={styles.bottomContent} data-test-id={TEST_IDS.bottomContent}>
          {bottomContent}
        </div>
      )}
    </div>
  );
}
