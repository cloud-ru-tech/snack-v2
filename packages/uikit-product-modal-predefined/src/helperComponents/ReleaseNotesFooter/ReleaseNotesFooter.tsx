import { Button, ButtonProps } from '@ds/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@ds/icons/interface/system';
import { PAGINATION_SLIDER_SIZE, PaginationSlider } from '@ds/pagination';
import { Skeleton } from '@ds/skeleton';
import { MouseEvent } from 'react';

import { SURFACE, TEST_IDS } from '../../constants';
import { Surface } from '../../types';
import styles from './styles.module.scss';

export type ReleaseNotesFooterProps = {
  /** Поверхность отображения */
  surface: Surface;
  /** Количество страниц */
  total: number;
  /** Состояние загрузки: количество страниц ещё неизвестно */
  loading?: boolean;
  /** Текущая страница, zero-based */
  pageIndex: number;
  /** Номер страницы для отображения */
  readablePageNumber: number;
  /** Переход на страницу по клику в слайдере (используется на modal) */
  onPageChange(pageIndex: number): void;
  /** Label кнопки «Ознакомиться позже» */
  readLaterLabel: string;
  /** Действие «Ознакомиться позже» */
  onReadLaterClick(event: MouseEvent<HTMLButtonElement>): void;
  /** Предыдущая страница */
  onPrevPageClick(): void;
  /** Следующая страница */
  onNextPageClick(): void;
  /** Дополнительные пропсы кнопки «Ознакомиться позже» */
  readLaterButtonProps?: Partial<ButtonProps>;
};

export function ReleaseNotesFooter({
  surface,
  total,
  loading,
  pageIndex,
  readablePageNumber,
  readLaterLabel,
  onReadLaterClick,
  onPrevPageClick,
  onNextPageClick,
  onPageChange,
  readLaterButtonProps,
}: ReleaseNotesFooterProps) {
  // Пока новости не загрузились, страниц ещё нет, но место под навигацию занято: иначе кнопки
  // появляются рывком поверх уже отрисованного контента.
  const hasPagination = loading || total > 1;
  const isModal = surface === SURFACE.Modal;
  const buttonSize = isModal ? 'm' : 'l';

  const handleSliderChange = (page: number) => onPageChange(page - 1);

  return (
    <div className={styles.root} data-surface={surface}>
      <Button
        view='function'
        appearance='neutral'
        size={buttonSize}
        label={readLaterLabel}
        data-test-id={TEST_IDS.releaseNotesReadLaterButton}
        {...readLaterButtonProps}
        onClick={onReadLaterClick}
      />

      {isModal && hasPagination && (
        <div className={styles.slider}>
          <Skeleton loading={loading} className={styles.sliderSkeleton}>
            <PaginationSlider
              size={PAGINATION_SLIDER_SIZE.Xs}
              total={total}
              page={readablePageNumber}
              onChange={handleSliderChange}
              data-test-id={TEST_IDS.releaseNotesPaginationSlider}
            />
          </Skeleton>
        </div>
      )}

      {hasPagination && (
        <div className={styles.controls}>
          <Button
            view='outline'
            appearance='neutral'
            size={buttonSize}
            icon={<ChevronLeftSVG />}
            disabled={loading || pageIndex === 0}
            onClick={onPrevPageClick}
            data-test-id={TEST_IDS.releaseNotesPrevButton}
          />
          <Button
            view='outline'
            appearance='neutral'
            size={buttonSize}
            icon={<ChevronRightSVG />}
            disabled={loading || readablePageNumber === total}
            onClick={onNextPageClick}
            data-test-id={TEST_IDS.releaseNotesNextButton}
          />
        </div>
      )}
    </div>
  );
}
