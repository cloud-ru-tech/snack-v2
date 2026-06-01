import { ChipChoice } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import {
  CHIP_CHOICE_ICON,
  CHIP_CHOICE_STATE_ROWS,
  CLEAR_BUTTON_PROPS,
  COLUMN_HEADERS,
  DATE_VALUE,
  SIZES,
} from '../visualMatrix.helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof ChipChoice.Date> = {
  title: 'Components/Chips/ChipChoice/Date',
  component: ChipChoice.Date,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Date>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Value × Size'
        firstColumnHeader='Value'
        columnHeaders={COLUMN_HEADERS}
        rows={[
          {
            variantLabel: 'no value',
            cells: SIZES.map(size => <ChipChoice.Date key={size} label='Date' size={size} />),
          },
          {
            variantLabel: 'no value + icon',
            cells: SIZES.map(size => <ChipChoice.Date key={size} label='Date' size={size} icon={CHIP_CHOICE_ICON} />),
          },
          {
            variantLabel: 'value set + icon + clear',
            cells: SIZES.map(size => (
              <ChipChoice.Date
                key={size}
                label='Date'
                size={size}
                defaultValue={DATE_VALUE}
                icon={CHIP_CHOICE_ICON}
                {...CLEAR_BUTTON_PROPS}
              />
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='State × Size'
        firstColumnHeader='State'
        columnHeaders={COLUMN_HEADERS}
        rows={CHIP_CHOICE_STATE_ROWS.map(({ key, extra }) => ({
          variantLabel: key,
          cells: SIZES.map(size => <ChipChoice.Date key={size} label='Date' size={size} {...extra} />),
        }))}
      />
    </div>
  ),
};
