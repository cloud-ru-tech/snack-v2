import { AlertButton } from '@ds/alert';
import cn from 'classnames';
import { ReactElement } from 'react';

import { SIZE, TEST_IDS, VARIANT } from './constants';
import styles from './styles.module.scss';
import { AiFieldBannerProps } from './types';

export function AiFieldBanner({
  className,
  variant = VARIANT.Information,
  size = SIZE.S,
  content,
  bottomContent,
  icon,
  actionLabel,
  onActionClick,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiFieldBannerProps): ReactElement {
  const showMainLine = Boolean(content) || Boolean(icon) || Boolean(actionLabel);
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
      <div
        className={styles.advice}
        data-size={size}
        data-variant={variant}
        data-test-id={TEST_IDS.advice}
        aria-hidden
      />
      {showMainLine && (
        <div className={styles.mainLine} data-test-id={TEST_IDS.mainLine}>
          {(icon || content) && (
            <div className={styles.content}>
              {icon && (
                <span className={styles.icon} data-size={size} data-test-id={TEST_IDS.icon}>
                  {icon}
                </span>
              )}

              {content && (
                <div className={styles.description} data-size={size} data-test-id={TEST_IDS.content}>
                  {content}
                </div>
              )}
            </div>
          )}

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
