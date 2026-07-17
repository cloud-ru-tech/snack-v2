import { Button } from '@ds/button';
import { DownloadSVG, TrashSVG, UpdateSVG } from '@ds/icons/interface/system';
import { MouseEvent } from 'react';

import { TEST_IDS } from '../../constants';
import { useAttachmentContext, useAttachmentFocusActionsContext } from '../../context';
import styles from './styles.module.scss';

type ActionsProps = {
  hideDownload?: boolean;
  hideDelete?: boolean;
  hideRetry?: boolean;
};

const noop = () => {};

export function Actions({ hideDelete, hideDownload, hideRetry }: ActionsProps) {
  const { onDelete, onDownload, file, disabled, onRetry } = useAttachmentContext();
  const { setFocused = noop } = useAttachmentFocusActionsContext();

  const showDownload = onDownload && !hideDownload;
  const showDelete = onDelete && !hideDelete;
  const showRetry = onRetry && !hideRetry;

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleRetry = (e: MouseEvent<HTMLButtonElement>) => {
    onRetry?.();
    e.stopPropagation();
  };

  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    onDownload?.(file);
    e.stopPropagation();
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    onDelete?.(file);
    e.stopPropagation();
  };

  if (!showDownload && !showDelete && !showRetry) {
    return null;
  }

  return (
    <div className={styles.actions} data-attachment-actions=''>
      {showDownload && (
        <Button
          disabled={disabled}
          view='function'
          appearance='neutral'
          size='m'
          icon={<DownloadSVG />}
          onClick={handleDownload}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-test-id={TEST_IDS.downloadAction}
        />
      )}
      {showRetry && (
        <Button
          disabled={disabled}
          view='function'
          appearance='neutral'
          size='m'
          icon={<UpdateSVG />}
          onClick={handleRetry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-test-id={TEST_IDS.retryAction}
        />
      )}
      {showDelete && (
        <Button
          disabled={disabled}
          view='function'
          appearance='neutral'
          size='m'
          icon={<TrashSVG />}
          onClick={handleDelete}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-test-id={TEST_IDS.deleteAction}
        />
      )}
    </div>
  );
}
