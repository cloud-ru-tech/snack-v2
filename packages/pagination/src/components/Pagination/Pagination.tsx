import { Button } from '@ds/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@ds/icons';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { getPageMoreTestId, getPageNumberTestId, PAGINATION_SIZE, TEST_IDS, VARIANT } from '../../constants';
import { PaginationContext } from '../../contexts';
import { PaginationSize, Variant } from '../../types';
import { getPaginationEntries, PaginationEntry, PaginationEntryKind } from '../../utils';
import { PaginationNumberItem } from '../PaginationNumberItem';
import styles from './styles.module.scss';

export type PaginationProps = WithSupportProps<{
  /** Общее количество страниц */
  total: number;
  /** Текущая страница */
  page: number;
  /** Варианты тега кнопок: <a/> или <button/> */
  variant?: Variant;
  /** Максимальное количество страниц/элементов, помещающихся до транкейта */
  maxLength?: number;
  /** Колбэк смены значения */
  onChange(page: number, event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void;
  /** Колбэк форматирования ссылки */
  hrefFormatter?(page: number): string;
  /** CSS класснейм */
  className?: string;
  /** Размер
   * @default 'm'
   */
  size?: PaginationSize;
}>;

const FIRST_PAGE = 1;
const ARROW_STEP = 1;
const MAX_LENGTH = 7;

export function Pagination({
  total,
  page,
  onChange,
  hrefFormatter,
  className,
  variant = VARIANT.Button,
  size = PAGINATION_SIZE.M,
  maxLength = MAX_LENGTH,
  ...rest
}: PaginationProps) {
  const entries = getPaginationEntries({
    firstPage: FIRST_PAGE,
    lastPage: total,
    currentPage: page,
    maxLength,
  });

  const buttonRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | undefined)[]>([]);
  const [buttonToFocus, setButtonToFocus] = useState(-1);

  useEffect(() => {
    buttonRefs.current[buttonToFocus]?.focus();
  }, [buttonToFocus]);

  const handlePreviousPageButtonClick = () => {
    const newPage = page - ARROW_STEP;
    onChange(newPage);

    if (newPage === FIRST_PAGE) {
      setButtonToFocus(FIRST_PAGE);
    }
  };

  const handleNextPageButtonClick = () => {
    const newPage = page + ARROW_STEP;
    onChange(newPage);

    if (newPage === total) {
      setButtonToFocus(total);
    }
  };

  const handleMoreButtonClick = (start: number, end: number) => {
    const targetPage = Math.floor((start + end) / 2);
    onChange(targetPage);
    setButtonToFocus(targetPage);
  };

  const renderEntry = (entry: PaginationEntry) => {
    if (entry.kind === PaginationEntryKind.Page) {
      return (
        <li key={entry.page}>
          <PaginationNumberItem
            label={entry.page}
            activated={entry.page === page}
            onClick={e => onChange(entry.page, e)}
            setButtonRef={(el: HTMLButtonElement | HTMLAnchorElement) => {
              buttonRefs.current[entry.page] = el;
            }}
            href={hrefFormatter?.(entry.page)}
            aria-current={entry.page === page ? 'page' : undefined}
            data-test-id={getPageNumberTestId(entry.page)}
          />
        </li>
      );
    }

    if (entry.kind === PaginationEntryKind.Break) {
      return (
        <li key={`${entry.start}-${entry.end}`}>
          <PaginationNumberItem
            label='...'
            onClick={() => handleMoreButtonClick(entry.start, entry.end)}
            data-test-id={getPageMoreTestId(entry.start, entry.end)}
          />
        </li>
      );
    }

    return null;
  };

  const buttonSize = size === PAGINATION_SIZE.M ? 'm' : 's';

  return (
    <PaginationContext.Provider value={{ size, variant }}>
      <nav
        className={className}
        aria-label='Pagination'
        data-size={size}
        data-variant={variant}
        {...extractSupportProps(rest)}
      >
        <ul className={styles.pagination} data-size={size}>
          <li>
            <Button
              view='simple'
              appearance='neutral'
              icon={<ChevronLeftSVG />}
              onClick={handlePreviousPageButtonClick}
              disabled={page === FIRST_PAGE}
              size={buttonSize}
              aria-label='Previous page'
              data-test-id={TEST_IDS.prev}
            />
          </li>
          {entries.map(renderEntry)}
          <li>
            <Button
              view='simple'
              appearance='neutral'
              icon={<ChevronRightSVG />}
              onClick={handleNextPageButtonClick}
              disabled={page === total}
              size={buttonSize}
              aria-label='Next page'
              data-test-id={TEST_IDS.next}
            />
          </li>
        </ul>
      </nav>
    </PaginationContext.Provider>
  );
}
