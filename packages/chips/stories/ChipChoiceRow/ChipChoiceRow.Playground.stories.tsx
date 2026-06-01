import { CHIP_CHOICE_TYPE, ChipChoiceRow, SIZE } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const DEMO_FILTERS = [
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Status',
    pinned: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    id: 'category',
    type: CHIP_CHOICE_TYPE.Multiple,
    label: 'Category',
    options: [
      { value: 'cat1', label: 'Category 1' },
      { value: 'cat2', label: 'Category 2' },
      { value: 'cat3', label: 'Category 3' },
    ],
  },
  {
    id: 'date',
    type: CHIP_CHOICE_TYPE.Date,
    label: 'Date',
    options: [],
  },
] as const;

const meta: Meta<typeof ChipChoiceRow> = {
  title: 'Components/Chips/ChipChoiceRow',
  component: ChipChoiceRow,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Строка фильтров — pinned и добавляемые чипы с кнопками управления.</DemoHint>
        <DemoActions align='start'>
          <div className={styles.resizableWrapper}>
            <ChipChoiceRow {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    filters: DEMO_FILTERS as never,
    size: SIZE.S,
    showClearButton: true,
    showAddButton: true,
    'data-test-id': TEST_IDS.chipChoiceRow.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    filters: { table: { disable: true } },
    visibleFilters: { table: { disable: true } },
    onVisibleFiltersChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoiceRow>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.chipChoiceRow.root)).toBeVisible();
  },
};
