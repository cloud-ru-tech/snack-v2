import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { InfoGroup, InfoGroupProps } from '../../src';

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
  title: 'Components/UikitProductInfoRow/InfoGroup',
  component: InfoGroup,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<InfoGroupProps<Row>>;

const columnsOpts = ['single', 'double'] as const;
const widths = ['fixed', 'full'] as const;
const widthDemoFrameStyle = { width: '920px', maxWidth: '100%' } as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='columns × width'
      firstColumnHeader='columns'
      columnHeaders={widths.map(w => w)}
      rows={columnsOpts.map(columns => ({
        variantLabel: columns,
        cells: widths.map(width => (
          <div key={`${columns}-${width}`} style={widthDemoFrameStyle}>
            <InfoGroup<Row>
              data={data}
              items={items}
              columns={columns}
              width={width}
              data-test-id={`info-group-matrix-${columns}-${width}`}
            />
          </div>
        )),
      }))}
    />
  ),
};
