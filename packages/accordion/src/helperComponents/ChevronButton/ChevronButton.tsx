import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';

import styles from './styles.module.scss';

export type ChevronButtonProps = {
  /** Раскрыт ли блок: шеврон вверх / вниз */
  expanded: boolean;
  /** id раскрываемой области */
  contentId: string;
  /** id заголовка блока — имя кнопки */
  titleId?: string;
  'data-test-id'?: string;
};

/** Шеврон заголовка аккордеона — Figma `buttonAccordion`. Клик обрабатывает строка заголовка. */
export function ChevronButton({ expanded, contentId, titleId, 'data-test-id': dataTestId }: ChevronButtonProps) {
  return (
    <button
      type='button'
      className={styles.root}
      aria-expanded={expanded}
      aria-controls={contentId}
      aria-labelledby={titleId}
      data-expanded={expanded || undefined}
      data-test-id={dataTestId}
    >
      <span className={styles.icon}>{expanded ? <ChevronUpSVG /> : <ChevronDownSVG />}</span>
    </button>
  );
}
