import { BottomSheet } from '@ds/bottom-sheet';
import { extractSupportProps } from '@ds/utils';
import { MouseEvent } from 'react';

import { CONTENT_STATE } from '../../constants';
import { useReleaseNotesNavigation } from '../../hooks';
import { modalPredefinedLocale } from '../../locale';
import { ReleaseNotesProps } from '../../types';
import { ReleaseNotesContent } from '../ReleaseNotesContent';
import { ReleaseNotesFooter } from '../ReleaseNotesFooter';

export function MobileReleaseNotes({
  open,
  onClose,
  closeOnPopstate,
  contentState = CONTENT_STATE.Data,
  items,
  loading,
  onReadLaterClick,
  onDataErrorRetryClick,
  onSlideChange,
  readLaterButtonProps,
  ...rest
}: ReleaseNotesProps) {
  const { t } = modalPredefinedLocale.useTranslations();
  const {
    pageIndex,
    readablePageNumber,
    setPage,
    handleClose,
    handleReadLaterClick,
    handleNextPageClick,
    handlePrevPageClick,
  } = useReleaseNotesNavigation({ onClose, onReadLaterClick, onSlideChange });
  const { onClick: onReadLaterButtonClick, ...readLaterButtonRest } = readLaterButtonProps ?? {};
  const shouldShowFooter = contentState === CONTENT_STATE.Data && (loading || items.length > 0);

  const handleReadLaterButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onReadLaterButtonClick?.(event);
    handleReadLaterClick();
  };

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      closeOnPopstate={closeOnPopstate}
      title={t('releaseNotes.title')}
      content={
        <ReleaseNotesContent
          contentState={contentState}
          items={items}
          loading={loading}
          pageIndex={pageIndex}
          surface='bottomSheet'
          noDataTitle={t('releaseNotes.noDataTitle')}
          noDataDescription={t('releaseNotes.noDataDescription')}
          errorTitle={t('releaseNotes.errorTitle')}
          errorDescription={t('releaseNotes.errorDescription')}
          retryLabel={t('releaseNotes.retry')}
          onPageChange={setPage}
          onDataErrorRetryClick={onDataErrorRetryClick}
        />
      }
      footer={
        shouldShowFooter ? (
          <ReleaseNotesFooter
            surface='bottomSheet'
            total={items.length}
            pageIndex={pageIndex}
            readablePageNumber={readablePageNumber}
            counterLabel={t('releaseNotes.counter', { page: readablePageNumber, total: items.length })}
            readLaterLabel={t('releaseNotes.readLater')}
            onReadLaterClick={handleReadLaterButtonClick}
            onPrevPageClick={handlePrevPageClick}
            onNextPageClick={() => handleNextPageClick(items.length)}
            readLaterButtonProps={readLaterButtonRest}
          />
        ) : undefined
      }
      data-content-state={contentState}
      data-surface='bottomSheet'
      {...extractSupportProps(rest)}
    />
  );
}
