import { NotifierSuccessFilledSVG, PauseSVG, PlaySVG, UpdateSVG } from '@ds/icons';

import { ToastUploadStatus, UploadActions } from '../../components/ToastUpload/types';
import { TEST_IDS } from '../../constants';
import { toasterLocale } from '../../locale';
import { ToastButton } from '../ToastButton';
import styles from './styles.module.scss';

function assertNever(value: never): never {
  throw new Error(`Unhandled ToastUploadStatus: ${String(value)}`);
}

export type LoadingStatusProps = {
  status: ToastUploadStatus;
  actions?: UploadActions;
};

export function LoadingStatus({ status, actions }: LoadingStatusProps) {
  const { t } = toasterLocale.useTranslations();

  switch (status) {
    case 'loading':
      return actions?.onPause ? (
        <span className={styles.buttonWrapper}>
          <ToastButton
            composition='iconOnly'
            onClick={actions.onPause}
            aria-label={t('upload.pause')}
            data-test-id={TEST_IDS.uploadStatusPause}
          >
            <PauseSVG />
          </ToastButton>
        </span>
      ) : null;
    case 'pause':
      return actions?.onContinue ? (
        <span className={styles.buttonWrapper}>
          <ToastButton
            composition='iconOnly'
            onClick={actions.onContinue}
            aria-label={t('upload.play')}
            data-test-id={TEST_IDS.uploadStatusPlay}
          >
            <PlaySVG />
          </ToastButton>
        </span>
      ) : null;
    case 'uploaded':
      return <NotifierSuccessFilledSVG className={styles.successIcon} />;
    case 'error':
    case 'errorUploaded':
      return actions?.onRetry ? (
        <span className={styles.buttonWrapper}>
          <ToastButton
            composition='iconOnly'
            onClick={actions.onRetry}
            aria-label={t('upload.retry')}
            data-test-id={TEST_IDS.uploadStatusRetry}
          >
            <UpdateSVG />
          </ToastButton>
        </span>
      ) : null;
    default:
      return assertNever(status);
  }
}
