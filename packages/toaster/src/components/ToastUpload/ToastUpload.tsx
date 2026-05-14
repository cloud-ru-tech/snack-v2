import { ChevronDownSVG, ChevronUpSVG, CrossSVG } from '@ds/icons';
import { useLocale } from '@ds/locale';
import { Scroll } from '@ds/scroll';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent } from 'react';

import { TEST_IDS } from '../../constants';
import { LoadingStatus } from '../../helperComponents/LoadingStatus';
import { ToastButton } from '../../helperComponents/ToastButton';
import { ToastUploadFileLine } from '../../helperComponents/ToastUploadFileLine';
import { ToastUploadProgress } from '../../helperComponents/ToastUploadProgress';
import { MAX_PROGRESS_PERCENT, progressBarAppearanceByStatus } from './constants';
import styles from './styles.module.scss';
import { ToastUploadProps } from './types';
import { formatPercent } from './utils';

export function ToastUpload({
  status,
  title,
  description,
  closeToast,
  onCloseClick,
  closable = true,
  className,
  files,
  collapsed,
  onCollapsed,
  generalActions,
  onCancelAll,
  progress,
  ...rest
}: ToastUploadProps) {
  const [isCollapsed, setIsCollapsed] = useValueControl({
    value: collapsed,
    defaultValue: false,
    onChange: onCollapsed,
  });

  const { t } = useLocale('ToastUpload');

  const showingTitle = title || t(`title.${status}`);

  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onCloseClick) {
      onCloseClick(e, closeToast);
    } else {
      closeToast?.();
    }
  };

  const handleCollapseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  // total <= 0 → 0% вместо NaN/Infinity.
  const progressPercent =
    progress.total > 0 ? Math.round((progress.current / progress.total) * MAX_PROGRESS_PERCENT) : 0;
  const isErrorUploaded = status === 'errorUploaded';

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.uploadRoot}
      data-collapsed={isCollapsed || undefined}
    >
      <div className={styles.titleLine}>
        <div className={styles.titleLineBody}>
          <div className={styles.title} data-test-id={TEST_IDS.uploadTitle}>
            {showingTitle}
          </div>

          {onCancelAll && (
            <span className={styles.buttonActionWrapper}>
              <ToastButton
                composition='labelOnly'
                label={t('cancelAll')}
                onClick={onCancelAll}
                data-test-id={TEST_IDS.uploadCancelButton}
              />
            </span>
          )}

          <span className={styles.buttonWrapper}>
            <ToastButton
              composition='iconOnly'
              onClick={handleCollapseClick}
              data-test-id={TEST_IDS.uploadCollapseButton}
            >
              {!isCollapsed ? <ChevronUpSVG /> : <ChevronDownSVG />}
            </ToastButton>
          </span>

          {closable && (
            <span className={styles.buttonWrapper}>
              <ToastButton composition='iconOnly' onClick={handleCloseClick} data-test-id={TEST_IDS.uploadClose}>
                <CrossSVG />
              </ToastButton>
            </span>
          )}
        </div>

        <div className={styles.generalProgress}>
          <div className={styles.statusLine}>
            <div className={styles.statusWrap}>
              <LoadingStatus status={status} actions={generalActions} />

              <TruncateString
                className={styles.description}
                data-status={status}
                text={description}
                data-test-id={TEST_IDS.uploadDescription}
              />
            </div>

            <span className={styles.totalCounter} data-test-id={TEST_IDS.uploadCounter}>
              {`${progress.current}/${progress.total}`}
            </span>

            <span className={styles.totalPercentage} data-test-id={TEST_IDS.uploadProgress}>
              {formatPercent(isErrorUploaded ? 0 : progressPercent)}
            </span>
          </div>

          {isCollapsed && (
            <ToastUploadProgress
              progress={isErrorUploaded ? MAX_PROGRESS_PERCENT : progressPercent}
              appearance={progressBarAppearanceByStatus[status]}
              data-test-id={TEST_IDS.uploadProgressBar}
            />
          )}
        </div>
      </div>

      {!isCollapsed && (
        // TODO(FF-8311): полосы скролла должны рендериться в тёмной теме независимо
        // от темы сайта (карточка тоста всегда на invertNeutral-поверхности).
        // Варианты: (a) scoped-remap `--sn-theme-color-*` на `invert*` только для
        // `.os-scrollbar`-сиблингов; (b) `.sn-dark` на обёртку + reset темы на
        // viewport через `useThemeContext()`. Требует ThemeProvider в дереве.
        <div className={styles.listWrapper}>
          <Scroll
            className={styles.list}
            size='s'
            data-test-id={TEST_IDS.uploadList}
            barHideStrategy='never'
            overflow={{ x: 'hidden' }}
          >
            {files.map((item, index) => (
              <ToastUploadFileLine key={item.id ?? `${item.title}-${index}`} item={item} />
            ))}
          </Scroll>
        </div>
      )}
    </div>
  );
}
