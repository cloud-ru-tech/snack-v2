import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { InfoGroup, InfoGroupProps } from '../../src';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

type Row = { a: string; b: boolean };

const data: Row = {
  a: 'Очень длинное значение поля A, чтобы было заметно поведение fixed и full ширины в матрице',
  b: false,
};

const items: InfoGroupProps<Row>['items'] = [
  { label: 'Field A', accessorKey: 'a' },
  { label: 'Field B', accessorKey: 'b' },
];

const meta: Meta<InfoGroupProps<Row>> = {
  title: 'Uikit Product/InfoRow/InfoGroup',
  component: InfoGroup,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<InfoGroupProps<Row>>;

const columnsOpts = ['single', 'double'] as const;
const widths = ['fixed', 'full'] as const;
export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='columns × width'
      firstColumnHeader='columns'
      columnHeaders={widths.map(w => w)}
      rows={columnsOpts.map(columns => ({
        variantLabel: columns,
        cells: widths.map(width => (
          <div key={`${columns}-${width}`} className={styles.widthDemoFrame}>
            <InfoGroup<Row>
              data={data}
              items={items}
              columns={columns}
              width={width}
              data-test-id={TEST_IDS.infoGroup.matrix(columns, width)}
            />
          </div>
        )),
      }))}
    />
  ),
};
