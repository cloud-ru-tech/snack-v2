import { CrossSVG } from '@ds/icons/interface/system';
import { Link } from '@ds/link';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent } from 'react';

import { AUTO_CLOSE_TIME, TEST_IDS, TOASTER_TYPE } from '../../constants';
import { ToastButton } from '../../helperComponents/ToastButton';
import { ToastButtonAction } from '../../helperComponents/ToastButtonAction';
import { ToastSystemEventProgress } from '../../helperComponents/ToastSystemEventProgress';
import { toasterLocale } from '../../locale';
import { APPEARANCE_TO_LINK_APPEARANCE } from './constants';
import styles from './styles.module.scss';
import { ToastSystemEventProps } from './types';
import { getIcon } from './utils';

export function ToastSystemEvent({
  appearance = 'neutral',
  onCloseClick,
  progressBar = true,
  closable = true,
  title,
  description,
  link,
  closeToast,
  className,
  action,
  autoClose,
  ...rest
}: ToastSystemEventProps) {
  const progressDuration =
    typeof autoClose === 'number' ? autoClose : (AUTO_CLOSE_TIME[TOASTER_TYPE.SystemEvent] as number);
  const showProgressBar = progressBar && autoClose !== false;
  const { t } = toasterLocale.useTranslations();

  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onCloseClick) {
      onCloseClick(e, closeToast);
    } else {
      closeToast?.();
    }
  };

  const icon = getIcon(appearance);

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.systemEventRoot}
      data-appearance={appearance}
      role={appearance === 'error' || appearance === 'errorCritical' ? 'alert' : 'status'}
    >
      <div className={styles.body}>
        <span className={styles.icon} data-test-id={TEST_IDS.systemEventIcon}>
          {icon}
        </span>

        <div className={styles.contentLayout}>
          <div className={styles.text}>
            <span className={styles.title}>
              <TruncateString text={title} maxLines={2} hideTooltip data-test-id={TEST_IDS.systemEventTitle} />
            </span>

            {description && (
              <span className={styles.description}>
                <TruncateString
                  maxLines={4}
                  text={description}
                  hideTooltip
                  data-test-id={TEST_IDS.systemEventDescription}
                />
              </span>
            )}
          </div>

          {link && (
            <Link
              label={link.label}
              href={link.href}
              truncateVariant='end'
              onClick={link.onClick}
              appearance={APPEARANCE_TO_LINK_APPEARANCE[appearance]}
              role={appearance === 'errorCritical' ? 'onAccent' : 'regular'}
              underlined
              className={styles.link}
              data-test-id={TEST_IDS.systemEventLink}
            />
          )}
        </div>

        {closable && (
          <span className={styles.buttonWrapper}>
            <ToastButton
              composition='iconOnly'
              onClick={handleCloseClick}
              data-test-id={TEST_IDS.systemEventButtonClose}
              aria-label={t('systemEvent.closeButton')}
            >
              <CrossSVG />
            </ToastButton>
          </span>
        )}
      </div>

      {showProgressBar && <ToastSystemEventProgress appearance={appearance} durationMs={progressDuration} />}

      {Array.isArray(action) && action.length > 0 && (
        <div className={styles.footer}>
          {action.map(buttonProps => (
            <ToastButtonAction key={buttonProps.label} {...buttonProps} />
          ))}
        </div>
      )}
    </div>
  );
}
