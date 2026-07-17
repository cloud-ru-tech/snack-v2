import { AdaptiveProvider } from '@ds/adaptive';
import { Button } from '@ds/button';
import { CheckSVG, CrossSVG, PlaceholderSVG } from '@ds/icons/interface/system';
import { LAYOUT_TYPE, TEST_IDS as TOOLBAR_TEST_IDS, Toolbar, ToolbarDataViewValue } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const noop = () => {};

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

const filterConfig = {
  filters: [
    {
      id: 'status',
      type: 'single' as const,
      label: 'Статус',
      options: [
        { value: 'active', label: 'Активные' },
        { value: 'archived', label: 'Архив' },
      ],
    },
  ],
  value: {},
  onChange: noop,
};

const bulkActions = [
  { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
  { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
];

type MatrixCellProps = {
  layoutType?: (typeof LAYOUT_TYPE)[keyof typeof LAYOUT_TYPE];
  outline?: boolean;
  withFilterRow?: boolean;
  filterOpen?: boolean;
  withBulk?: boolean;
  bulkChecked?: boolean;
  bulkIndeterminate?: boolean;
  withAfter?: boolean;
  dataViewValue?: ToolbarDataViewValue;
};

function ToolbarMatrixCell({
  layoutType = LAYOUT_TYPE.Desktop,
  outline,
  withFilterRow,
  filterOpen,
  withBulk,
  bulkChecked,
  bulkIndeterminate,
  withAfter,
  dataViewValue,
}: MatrixCellProps) {
  const containerClassName = layoutType === LAYOUT_TYPE.Mobile ? styles.containerMatrixMobile : styles.containerMatrix;

  return (
    <AdaptiveProvider layoutType={layoutType}>
      <div className={containerClassName}>
        <Toolbar
          outline={outline}
          data-test-id={TOOLBAR_TEST_IDS.main}
          search={{ value: '', onChange: noop, placeholder: 'Поиск' }}
          onRefresh={noop}
          moreActions={[{ content: { option: 'Экспорт' }, onClick: noop }]}
          after={
            withAfter ? (
              <Button
                view='function'
                appearance='neutral'
                icon={<PlaceholderSVG />}
                size='m'
                aria-label='Дополнительное действие'
                onClick={noop}
              />
            ) : undefined
          }
          dataView={dataViewValue ? { show: true, value: dataViewValue, onChange: noop } : undefined}
          filterRow={
            withFilterRow
              ? {
                  open: filterOpen ?? false,
                  onOpenChange: noop,
                  ...filterConfig,
                }
              : undefined
          }
          {...(withBulk
            ? {
                checked: bulkChecked,
                indeterminate: bulkIndeterminate,
                selectedCount: bulkChecked || bulkIndeterminate ? 5 : 0,
                totalCount: 100,
                onCheck: noop,
                bulkActions,
              }
            : {})}
        />
      </div>
    </AdaptiveProvider>
  );
}

const layoutColumns = [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile] as const;

const filteringRows: { label: string; props: Omit<MatrixCellProps, 'layoutType'> }[] = [
  { label: 'filtering=not', props: {} },
  { label: 'filtering=closed', props: { withFilterRow: true } },
  { label: 'filtering=open', props: { withFilterRow: true, filterOpen: true } },
];

const outlineRows: { label: string; props: Omit<MatrixCellProps, 'layoutType'> }[] = [
  { label: 'default', props: {} },
  { label: 'no outline', props: { outline: false } },
  { label: 'outline + open filters', props: { withFilterRow: true, filterOpen: true } },
];

const bulkRows: { label: string; props: Omit<MatrixCellProps, 'layoutType' | 'withBulk'> }[] = [
  { label: 'unchecked', props: { bulkChecked: false } },
  { label: 'checked', props: { bulkChecked: true } },
  { label: 'indeterminate', props: { bulkIndeterminate: true } },
];

const dataViewRows: { label: string; props: Omit<MatrixCellProps, 'layoutType'> }[] = [
  { label: 'list', props: { dataViewValue: 'list' } },
  { label: 'compact', props: { dataViewValue: 'compact' } },
];

const afterRows: { label: string; props: Omit<MatrixCellProps, 'layoutType'> }[] = [
  { label: 'after', props: { withAfter: true } },
];

function renderLayoutRow(props: Omit<MatrixCellProps, 'layoutType'>): ReactElement[] {
  return layoutColumns.map(layoutType => <ToolbarMatrixCell key={layoutType} layoutType={layoutType} {...props} />);
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrixRoot}>
      <div className={styles.matrixSection}>
        <StoryTable
          sectionTitle='Layout × Filtering'
          firstColumnHeader='State'
          columnHeaders={layoutColumns.map(layout => layout)}
          rows={filteringRows.map(({ label, props }) => ({
            variantLabel: label,
            cells: renderLayoutRow(props),
          }))}
        />

        <StoryTable
          sectionTitle='Outline'
          firstColumnHeader='State'
          columnHeaders={['Desktop']}
          rows={outlineRows.map(({ label, props }) => ({
            variantLabel: label,
            cells: [<ToolbarMatrixCell key={label} {...props} />],
          }))}
        />

        <StoryTable
          sectionTitle='Bulk selection — Desktop'
          firstColumnHeader='State'
          columnHeaders={['Desktop']}
          rows={bulkRows.map(({ label, props }) => ({
            variantLabel: label,
            cells: [<ToolbarMatrixCell key={label} withBulk {...props} />],
          }))}
        />

        <StoryTable
          sectionTitle='Bulk selection — Mobile'
          firstColumnHeader='State'
          columnHeaders={['Mobile']}
          rows={[
            {
              variantLabel: 'unchecked',
              cells: [
                <ToolbarMatrixCell
                  key='mobile-unchecked'
                  layoutType={LAYOUT_TYPE.Mobile}
                  withBulk
                  bulkChecked={false}
                />,
              ],
            },
          ]}
        />

        <StoryTable
          sectionTitle='DataView'
          firstColumnHeader='Value'
          columnHeaders={layoutColumns.map(layout => layout)}
          rows={dataViewRows.map(({ label, props }) => ({
            variantLabel: label,
            cells: renderLayoutRow(props),
          }))}
        />

        <StoryTable
          sectionTitle='After slot'
          firstColumnHeader='State'
          columnHeaders={layoutColumns.map(layout => layout)}
          rows={afterRows.map(({ label, props }) => ({
            variantLabel: label,
            cells: renderLayoutRow(props),
          }))}
        />
      </div>
    </div>
  ),
};
