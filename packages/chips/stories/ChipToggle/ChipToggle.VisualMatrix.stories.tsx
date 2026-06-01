import { ChipToggle } from '@ds/chips';
import { SettingsSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { COLUMN_HEADERS, COMMON_STATES, SIZES } from '../visualMatrix.helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof ChipToggle> = {
  title: 'Components/Chips/ChipToggle',
  component: ChipToggle,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChipToggle>;

const STATES = [...COMMON_STATES, { key: 'checked', extra: { checked: true } }] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × Size'
        firstColumnHeader='State'
        columnHeaders={COLUMN_HEADERS}
        rows={STATES.map(({ key, extra }) => ({
          variantLabel: key,
          cells: SIZES.map(size => (
            <ChipToggle key={size} label='Label' size={size} checked={false} onChange={() => {}} {...extra} />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='State × Size (with icon)'
        firstColumnHeader='State'
        columnHeaders={COLUMN_HEADERS}
        rows={STATES.map(({ key, extra }) => ({
          variantLabel: key,
          cells: SIZES.map(size => (
            <ChipToggle
              key={size}
              label='Label'
              size={size}
              checked={false}
              icon={<SettingsSVG />}
              onChange={() => {}}
              {...extra}
            />
          )),
        }))}
      />
    </div>
  ),
};
