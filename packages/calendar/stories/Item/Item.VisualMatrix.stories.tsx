import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StoryTable, StoryTableRow } from '#storybook/components';

import calendarReadme from '../../README.md?raw';
import { RANGE_POSITION, SIZE } from '../../src/constants.ts';
import { CalendarItemProps, Item } from '../../src/helperComponents/Item';
import styles from './styles.module.scss';

const meta: Meta<CalendarItemProps> = {
  title: 'Components/Calendar/Item',
  component: Item,
  parameters: {
    controls: { disable: true },
    readme: { content: calendarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3722-10703&m=dev',
    },
  },
  args: {},
};

export default meta;

type StoryProps = CalendarItemProps;

type Story = StoryObj<StoryProps>;

const sizes = Object.values(SIZE);

type RowProps = Omit<CalendarItemProps, 'label'> & {
  key: string;
};

function getItemsRow({ key, size, ...props }: RowProps): StoryTableRow {
  const commonProps: Omit<CalendarItemProps, 'size'> = {
    ...props,
    label: '00',
    visible: true,
    current: true,
  };

  return {
    variantLabel: key,
    cells: [
      <Item key={`regular-${key}`} size={size} {...commonProps} {...props} />,
      <Item key={`holiday-${key}`} size={size} {...commonProps} holiday />,
    ],
  };
}

const Template: StoryFn<StoryProps> = () => (
  <div className={styles.tablesWrapper}>
    {sizes.map(size => (
      <StoryTable
        key={size}
        sectionTitle={`States (${size})`}
        firstColumnHeader='Appearance'
        columnHeaders={['regular', 'holiday']}
        rows={[
          getItemsRow({ key: 'regular', size }),
          getItemsRow({ key: 'checked (out, no range)', size, checked: true, rangePosition: RANGE_POSITION.Out }),
          getItemsRow({ key: 'checked (range start)', size, checked: true, rangePosition: RANGE_POSITION.Start }),
          getItemsRow({ key: 'checked (range in)', size, checked: true, rangePosition: RANGE_POSITION.In }),
          getItemsRow({ key: 'checked (range end)', size, checked: true, rangePosition: RANGE_POSITION.End }),
          getItemsRow({ key: 'disabled', size, disabled: true }),
          getItemsRow({ key: 'another', size, another: true }),
        ]}
      />
    ))}
  </div>
);

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: Template,
};
