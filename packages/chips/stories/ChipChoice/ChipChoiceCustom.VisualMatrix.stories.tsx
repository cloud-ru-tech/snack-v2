import { ChipChoice } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import {
  CHIP_CHOICE_ICON,
  CHIP_CHOICE_STATE_ROWS,
  CLEAR_BUTTON_PROPS,
  COLUMN_HEADERS,
  SIZES,
} from '../visualMatrix.helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof ChipChoice.Custom> = {
  title: 'Components/Chips/ChipChoice/Custom',
  component: ChipChoice.Custom,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Custom>;

const CUSTOM_OPTIONS = ['Alpha', 'Beta', 'Gamma'];

const customProps = {
  content: () => (
    <div className={styles.customContent}>
      {CUSTOM_OPTIONS.map(option => (
        <button key={option} type='button' className={styles.customOption}>
          {option}
        </button>
      ))}
    </div>
  ),
  valueRender: (value?: string) => value ?? null,
};

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
            cells: SIZES.map(size => <ChipChoice.Custom key={size} label='Custom' size={size} {...customProps} />),
          },
          {
            variantLabel: 'no value + icon',
            cells: SIZES.map(size => (
              <ChipChoice.Custom key={size} label='Custom' size={size} icon={CHIP_CHOICE_ICON} {...customProps} />
            )),
          },
          {
            variantLabel: 'value set + icon + clear',
            cells: SIZES.map(size => (
              <ChipChoice.Custom
                key={size}
                label='Custom'
                size={size}
                value='Alpha'
                icon={CHIP_CHOICE_ICON}
                {...customProps}
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
            <ChipChoice.Custom key={size} label='Custom' size={size} {...customProps} {...extra} />
          )),
        }))}
      />
    </div>
  ),
};
