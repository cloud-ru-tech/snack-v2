import { FieldSelect, FieldSelectProps } from '@ds/fields';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type SectionFilterProps = {
  /** Настройки полей-фильтров. Размер поля фиксирован — `l`. */
  items: FieldSelectProps[];
};

/** Ряд фильтров секции (Figma `sectionFilter`): поля делят ширину поровну и переносятся на новую строку. */
export function SectionFilter({ items }: SectionFilterProps) {
  return (
    <div className={styles.sectionFilter} data-test-id={TEST_IDS.filters}>
      {items.map((item, index) => (
        <FieldSelect key={item.id ?? index} {...item} className={cn(styles.filter, item.className)} size='l' />
      ))}
    </div>
  );
}
