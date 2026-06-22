import { AlertButton } from '@ds/alert';
import cn from 'classnames';
import { ReactElement } from 'react';

import { SIZE, TEST_IDS, TYPE } from './constants';
import styles from './styles.module.scss';
import { AiFieldBannerProps } from './types';

export function AiFieldBanner({
  className,
  variant = TYPE.Information,
  size = SIZE.S,
  description,
  children,
  hasAdditional: hasAdditionalProp,
  icon,
  actionLabel,
  onActionClick,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiFieldBannerProps): ReactElement {
  const showMainLine = Boolean(description) || Boolean(icon) || Boolean(actionLabel);
  const hasAdditional = hasAdditionalProp ?? Boolean(children);

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-type={variant}
      data-size={size}
      data-has-additional={hasAdditional ? 'true' : 'false'}
      data-test-id={dataTestId}
    >
      <div className={styles.advice} data-size={size} data-type={variant} data-test-id={TEST_IDS.advice} aria-hidden />
      {showMainLine && (
        <div className={styles.mainLine} data-test-id={TEST_IDS.mainLine}>
          {(icon || description) && (
            <div className={styles.content}>
              {icon && (
                <span className={styles.icon} data-size={size} data-test-id={TEST_IDS.icon}>
                  {icon}
                </span>
              )}

              {description && (
                <div className={styles.description} data-size={size} data-test-id={TEST_IDS.description}>
                  {description}
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

      {hasAdditional && (
        <div className={styles.additional} data-test-id={TEST_IDS.additional}>
          {children}
        </div>
      )}
    </div>
  );
}
