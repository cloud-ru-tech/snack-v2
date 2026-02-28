import { extractSupportProps, type WithSupportProps } from '@design-system/utils';

import { PAGINATION_SLIDER_SIZE } from '../../constants';
import type { PaginationSliderSize } from '../../types';
import { getRange } from '../../utils';
import { PaginationSliderItem } from '../PaginationSliderItem';
import styles from './styles.module.scss';

export type PaginationSliderProps = WithSupportProps<{
  /** Общее количество страниц */
  total: number;
  /** Текущая страница */
  page: number;
  /** Колбек смены значения */
  onChange(page: number): void;
  /** CSS класснейм */
  className?: string;
  /** Размер
   * @default 'xs'
   */
  size?: PaginationSliderSize;
}>;

const FIRST_PAGE = 1;

export function PaginationSlider({
  total,
  page,
  onChange,
  className,
  size = PAGINATION_SLIDER_SIZE.Xs,
  ...rest
}: PaginationSliderProps) {
  return (
    <nav className={className} aria-label='Pagination slider' {...extractSupportProps(rest)}>
      <ul className={styles.paginationSlider} data-size={size}>
        {getRange(FIRST_PAGE, total).map(value => (
          <li key={value}>
            <PaginationSliderItem
              activated={value === page}
              onClick={() => onChange(value)}
              size={size}
              data-test-id={`page-button-slider-${value}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
