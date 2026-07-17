import { Button } from '@ds/button';
import { Carousel } from '@ds/carousel';
import { CrossSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';
import { Skeleton } from '@ds/skeleton';
import cn from 'classnames';

import { CONTENT_STATE, TEST_IDS } from '../../constants';
import { NoteItemProps, ReleaseNotesContentState } from '../../types';
import { NoteItem } from '../NoteItem';
import styles from './styles.module.scss';

export type ReleaseNotesContentProps = {
  /** Визуальное состояние */
  contentState: ReleaseNotesContentState;
  /** Новости */
  items: NoteItemProps[];
  /** Состояние загрузки */
  loading?: boolean;
  /** Текущая страница, zero-based */
  pageIndex: number;
  /** Поверхность */
  surface: 'modal' | 'bottomSheet';
  /** Заголовок no-data */
  noDataTitle: string;
  /** Описание no-data */
  noDataDescription: string;
  /** Заголовок ошибки */
  errorTitle: string;
  /** Описание ошибки */
  errorDescription: string;
  /** Label retry-кнопки */
  retryLabel: string;
  /** Смена страницы */
  onPageChange(pageIndex: number): void;
  /** Повторная загрузка */
  onDataErrorRetryClick?(): void;
};

export function ReleaseNotesContent({
  contentState,
  items,
  loading,
  pageIndex,
  surface,
  noDataTitle,
  noDataDescription,
  errorTitle,
  errorDescription,
  retryLabel,
  onPageChange,
  onDataErrorRetryClick,
}: ReleaseNotesContentProps) {
  const total = items.length;
  const hasItems = total > 0;

  if (loading) {
    return (
      <div className={styles.loading} data-surface={surface}>
        <Skeleton loading width='100%' height='100%' borderRadius='var(--border-radius-l)' />
      </div>
    );
  }

  if (contentState === CONTENT_STATE.Error) {
    return (
      <div className={styles.stateWrapper} data-surface={surface}>
        <InfoBlock
          className={styles.state}
          size='l'
          title={errorTitle}
          description={errorDescription}
          icon={{ icon: CrossSVG, appearance: 'neutral', decor: true }}
          data-test-id={TEST_IDS.releaseNotesError}
          footer={
            <Button
              view='filled'
              appearance='neutral'
              size='l'
              label={retryLabel}
              onClick={onDataErrorRetryClick}
              data-test-id={TEST_IDS.releaseNotesRetryButton}
            />
          }
        />
      </div>
    );
  }

  if (contentState === CONTENT_STATE.NoData || !hasItems) {
    return (
      <div className={styles.stateWrapper} data-surface={surface}>
        <InfoBlock
          className={styles.state}
          size='l'
          title={noDataTitle}
          description={noDataDescription}
          data-test-id={TEST_IDS.releaseNotesNoData}
        />
      </div>
    );
  }

  return (
    <div className={cn(styles.root, styles[surface])}>
      <Carousel
        arrows={false}
        pagination={false}
        swipe
        state={{ page: pageIndex, onChange: onPageChange }}
        className={styles.carousel}
      >
        {items.map(item => (
          <NoteItem key={`${item.title}-${item.image.src}`} {...item} surface={surface} />
        ))}
      </Carousel>
    </div>
  );
}
