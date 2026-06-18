import { Button, ButtonProps } from '@ds/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@ds/icons';
import { MouseEvent } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ReleaseNotesFooterProps = {
  /** Поверхность отображения */
  surface: 'modal' | 'bottomSheet';
  /** Количество страниц */
  total: number;
  /** Текущая страница, zero-based */
  pageIndex: number;
  /** Номер страницы для отображения */
  readablePageNumber: number;
  /** Текст счётчика «1 из N» (используется на bottomSheet) */
  counterLabel: string;
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
  pageIndex,
  readablePageNumber,
  counterLabel,
  readLaterLabel,
  onReadLaterClick,
  onPrevPageClick,
  onNextPageClick,
  readLaterButtonProps,
}: ReleaseNotesFooterProps) {
  const hasPagination = total > 1;
  const isModal = surface === 'modal';
  const buttonSize = isModal ? 'm' : 'l';

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

      {hasPagination && (
        <div className={styles.controls}>
          {!isModal && <span className={styles.counter}>{counterLabel}</span>}
          <Button
            view='outline'
            appearance='neutral'
            size={buttonSize}
            icon={<ChevronLeftSVG />}
            disabled={pageIndex === 0}
            onClick={onPrevPageClick}
            data-test-id={TEST_IDS.releaseNotesPrevButton}
          />
          <Button
            view='outline'
            appearance='neutral'
            size={buttonSize}
            icon={<ChevronRightSVG />}
            disabled={readablePageNumber === total}
            onClick={onNextPageClick}
            data-test-id={TEST_IDS.releaseNotesNextButton}
          />
        </div>
      )}
    </div>
  );
}
