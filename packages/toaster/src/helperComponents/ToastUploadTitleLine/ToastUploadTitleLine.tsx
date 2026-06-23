import { ChevronDownSVG, ChevronUpSVG, CrossSVG } from '@ds/icons';
import { TruncateString } from '@ds/truncate-string';
import { MouseEvent } from 'react';

import { MAX_PROGRESS_PERCENT, progressBarAppearanceByStatus } from '../../components/ToastUpload/constants';
import { ToastUploadStatus, UploadActions } from '../../components/ToastUpload/types';
import { formatPercent } from '../../components/ToastUpload/utils';
import { TEST_IDS } from '../../constants';
import { toasterLocale } from '../../locale';
import { LoadingStatus } from '../LoadingStatus';
import { ToastButton } from '../ToastButton';
import { ToastUploadProgress } from '../ToastUploadProgress';
import styles from './styles.module.scss';

export type ToastUploadTitleLineProps = {
  status: ToastUploadStatus;
  title: string;
  description: string;
  progress: { current: number; total: number };
  isCollapsed: boolean;
  onCollapseClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onCloseClick: (e: MouseEvent<HTMLButtonElement>) => void;
  closable: boolean;
  generalActions?: Omit<UploadActions, 'onCancel'>;
  onCancelAll?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ToastUploadTitleLine({
  status,
  title,
  description,
  progress,
  isCollapsed,
  onCollapseClick,
  onCloseClick,
  closable,
  generalActions,
  onCancelAll,
}: ToastUploadTitleLineProps) {
  const { t } = toasterLocale.useTranslations();

  const showingTitle = title || t(`upload.title.${status}`);

  const progressPercent =
    progress.total > 0 ? Math.round((progress.current / progress.total) * MAX_PROGRESS_PERCENT) : 0;
  const isErrorUploaded = status === 'errorUploaded';

  return (
    <div className={styles.titleLine}>
      <div className={styles.titleLineBody}>
        <TruncateString className={styles.title} text={showingTitle} data-test-id={TEST_IDS.uploadTitle} maxLines={1} />

        {onCancelAll && (
          <span className={styles.buttonActionWrapper}>
            <ToastButton
              composition='labelOnly'
              label={t('upload.cancelAll')}
              onClick={onCancelAll}
              data-test-id={TEST_IDS.uploadCancelButton}
            />
          </span>
        )}

        <span className={styles.buttonWrapper}>
          <ToastButton composition='iconOnly' onClick={onCollapseClick} data-test-id={TEST_IDS.uploadCollapseButton}>
            {!isCollapsed ? <ChevronUpSVG /> : <ChevronDownSVG />}
          </ToastButton>
        </span>

        {closable && (
          <span className={styles.buttonWrapper}>
            <ToastButton composition='iconOnly' onClick={onCloseClick} data-test-id={TEST_IDS.uploadClose}>
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
  );
}
