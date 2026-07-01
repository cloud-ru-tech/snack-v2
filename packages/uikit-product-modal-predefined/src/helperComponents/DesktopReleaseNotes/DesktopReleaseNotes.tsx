import { ModalCustom, WIDTH } from '@ds/modal';
import { extractSupportProps } from '@ds/utils';

import { CONTENT_STATE } from '../../constants';
import { useReleaseNotesNavigation } from '../../hooks';
import { modalPredefinedLocale } from '../../locale';
import { ReleaseNotesProps } from '../../types';
import { ReleaseNotesContent } from '../ReleaseNotesContent';
import { ReleaseNotesFooter } from '../ReleaseNotesFooter';
import styles from './styles.module.scss';

export function DesktopReleaseNotes({
  open,
  onClose,
  closeOnPopstate,
  contentState = CONTENT_STATE.Data,
  items,
  loading,
  onReadLaterClick,
  onDataErrorRetryClick,
  onSlideChange,
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
  const shouldShowFooter = contentState === CONTENT_STATE.Data && (loading || items.length > 0);

  return (
    <ModalCustom
      open={open}
      onClose={handleClose}
      closeOnPopstate={closeOnPopstate}
      width={WIDTH.M}
      data-content-state={contentState}
      data-surface='modal'
      {...extractSupportProps(rest)}
    >
      <div className={styles.safeAreaTop} />
      <ModalCustom.Header title={t('releaseNotes.title')} />
      <ModalCustom.Body
        className={styles.body}
        content={
          <ReleaseNotesContent
            contentState={contentState}
            items={items}
            loading={loading}
            pageIndex={pageIndex}
            surface='modal'
            noDataTitle={t('releaseNotes.noDataTitle')}
            noDataDescription={t('releaseNotes.noDataDescription')}
            errorTitle={t('releaseNotes.errorTitle')}
            errorDescription={t('releaseNotes.errorDescription')}
            retryLabel={t('releaseNotes.retry')}
            onPageChange={setPage}
            onDataErrorRetryClick={onDataErrorRetryClick}
          />
        }
      />
      <div className={styles.safeAreaBottom} />
      {shouldShowFooter && (
        <ModalCustom.Footer>
          <ReleaseNotesFooter
            surface='modal'
            total={items.length}
            pageIndex={pageIndex}
            readablePageNumber={readablePageNumber}
            counterLabel={t('releaseNotes.counter', { page: readablePageNumber, total: items.length })}
            readLaterLabel={t('releaseNotes.readLater')}
            onReadLaterClick={handleReadLaterClick}
            onPrevPageClick={handlePrevPageClick}
            onNextPageClick={() => handleNextPageClick(items.length)}
          />
        </ModalCustom.Footer>
      )}
    </ModalCustom>
  );
}
