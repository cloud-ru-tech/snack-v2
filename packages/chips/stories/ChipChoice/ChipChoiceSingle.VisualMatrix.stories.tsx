import { ChipChoice } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import {
  CHIP_CHOICE_ICON,
  CHIP_CHOICE_STATE_ROWS,
  CLEAR_BUTTON_PROPS,
  COLUMN_HEADERS,
  OPTIONS,
  SIZES,
} from '../visualMatrix.helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof ChipChoice.Single> = {
  title: 'Components/Chips/ChipChoice/Single',
  component: ChipChoice.Single,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Single>;

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
            cells: SIZES.map(size => <ChipChoice.Single key={size} label='Filter' size={size} options={OPTIONS} />),
          },
          {
            variantLabel: 'no value + icon',
            cells: SIZES.map(size => (
              <ChipChoice.Single key={size} label='Filter' size={size} options={OPTIONS} icon={CHIP_CHOICE_ICON} />
            )),
          },
          {
            variantLabel: 'value set + icon + clear',
            cells: SIZES.map(size => (
              <ChipChoice.Single
                key={size}
                label='Filter'
                size={size}
                options={OPTIONS}
                defaultValue='opt1'
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
          cells: SIZES.map(size => (
            <ChipChoice.Single key={size} label='Filter' size={size} options={OPTIONS} {...extra} />
          )),
        }))}
      />
    </div>
  ),
};
