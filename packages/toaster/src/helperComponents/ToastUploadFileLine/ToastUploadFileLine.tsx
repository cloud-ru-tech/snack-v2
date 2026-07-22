import { CrossSVG } from '@ds/icons/interface/system';
import { Link } from '@ds/link';
import { TruncateString } from '@ds/truncate-string';
import { useCallback, useRef, useSyncExternalStore } from 'react';

import { fileItemProgressBarAppearanceByStatus, MAX_PROGRESS_PERCENT } from '../../components/ToastUpload/constants';
import { UploadItem } from '../../components/ToastUpload/types';
import { formatPercent } from '../../components/ToastUpload/utils';
import { TEST_IDS } from '../../constants';
import { LoadingStatus } from '../LoadingStatus';
import { ToastButton } from '../ToastButton';
import { ToastUploadProgress } from '../ToastUploadProgress';
import styles from './styles.module.scss';

export type ToastUploadFileLineProps = { item: UploadItem };

export function ToastUploadFileLine({ item: initItem }: ToastUploadFileLineProps) {
  // Хранит «текущий» снэпшот: исходный initItem + наложенные patch'и
  // из subscribeToState. Обновления приходят синхронно в getSnapshot().
  const itemRef = useRef(initItem);
  // Если родитель меняет initItem (новый объект), сбрасываемся на него —
  // subscribeToState следующего initItem'а заменит подписку через
  // useSyncExternalStore (зависит от ссылочной идентичности subscribe).
  if (itemRef.current !== initItem) {
    itemRef.current = initItem;
  }

  const subscribe = useCallback(
    (notify: () => void) => {
      if (!initItem.subscribeToState) return () => undefined;
      const unsubscribe = initItem.subscribeToState(patch => {
        itemRef.current = { ...itemRef.current, ...patch };
        notify();
      });
      return () => unsubscribe?.();
    },
    [initItem],
  );

  const getSnapshot = useCallback(() => itemRef.current, []);

  const item = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const linkInfo = item.status === 'uploaded' ? item.link : undefined;
  const showCancelButton = !linkInfo && Boolean(item.actions?.onCancel);

  const isError = item.status === 'error';

  return (
    <div className={styles.fileLine} data-test-id={TEST_IDS.uploadFileItem}>
      <div className={styles.fileHeadLine}>
        <TruncateString text={item.title} className={styles.fileTitle} maxLines={1} />

        {linkInfo && (
          <Link
            label={linkInfo.label}
            href={linkInfo.href}
            truncateVariant='end'
            onClick={linkInfo.onClick}
            appearance='invertNeutral'
            underlined
            data-test-id={TEST_IDS.uploadFileItemLink}
          />
        )}

        {showCancelButton && (
          <span className={styles.buttonWrapper}>
            <ToastButton
              composition='iconOnly'
              onClick={item.actions?.onCancel}
              data-test-id={TEST_IDS.uploadFileItemCancel}
            >
              <CrossSVG />
            </ToastButton>
          </span>
        )}
      </div>

      <ToastUploadProgress
        progress={isError ? MAX_PROGRESS_PERCENT : item.progress}
        appearance={fileItemProgressBarAppearanceByStatus[item.status]}
      />

      <div className={styles.fileStatusLine}>
        <div className={styles.fileStatusWrap}>
          <LoadingStatus status={item.status} actions={item.actions} />

          <TruncateString className={styles.fileStatusDescription} data-status={item.status} text={item.statusLabel} />
        </div>

        <span className={styles.fileSize} data-status={item.status}>
          {item.formattedSize}
        </span>

        <span className={styles.fileStatusPercentage} data-status={item.status}>
          {formatPercent(isError ? 0 : item.progress)}
        </span>
      </div>
    </div>
  );
}
