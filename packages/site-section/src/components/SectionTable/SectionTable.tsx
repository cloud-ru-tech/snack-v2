import { useAdaptiveLayout } from '@ds/adaptive';
import { RichText } from '@ds/site-rich-text';
import { SECTION_TITLE_TYPE } from '@ds/site-section-title';
import { ColumnDefinition, Table, TABLE_ROW_COLOR, TableRowColor, VIEW } from '@ds/table';
import { WithSupportProps } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import styles from './styles.module.scss';

export type SectionTableProps<TData extends object> = WithSupportProps<
  Omit<SectionBasicProps, 'children'> & {
    /** Строки таблицы. */
    data: TData[];
    /** Колонки `Table`: шапка и ячейки строк. */
    columnDefinitions: ColumnDefinition<TData>[];
    /** Стабильный идентификатор строки. */
    getRowId?: (row: TData) => string;
    /** Подпись под таблицей. */
    caption?: string;
    /** Фон шапки. */
    headerRowBackgroundColor?: TableRowColor;
  }
>;

export function SectionTable<TData extends object>({
  data,
  columnDefinitions,
  getRowId,
  caption,
  headerRowBackgroundColor = TABLE_ROW_COLOR.Neutral,
  className,
  type = SECTION_TITLE_TYPE.DescriptionUnderTitle,
  ...sectionProps
}: SectionTableProps<TData>) {
  const { layoutType } = useAdaptiveLayout();

  return (
    <SectionBasic className={className} type={type} {...sectionProps}>
      <div className={styles.table}>
        <Table
          data={data}
          columnDefinitions={columnDefinitions}
          getRowId={getRowId}
          headerRowBackgroundColor={headerRowBackgroundColor}
          view={VIEW.Table}
          suppressToolbar
          suppressPagination
          outline
          data-test-id={TEST_IDS.table}
        />
        {caption && (
          <RichText
            className={styles.caption}
            content={caption}
            data-layout-type={layoutType}
            data-test-id={TEST_IDS.caption}
          />
        )}
      </div>
    </SectionBasic>
  );
}
