import { ChipAssist } from '@ds/chips';
import { SettingsSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { COLUMN_HEADERS, COMMON_STATES, SIZES } from '../visualMatrix.helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof ChipAssist> = {
  title: 'Components/Chips/ChipAssist',
  component: ChipAssist,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChipAssist>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × Size'
        firstColumnHeader='State'
        columnHeaders={COLUMN_HEADERS}
        rows={COMMON_STATES.map(({ key, extra }) => ({
          variantLabel: key,
          cells: SIZES.map(size => <ChipAssist key={size} label='Label' size={size} onClick={() => {}} {...extra} />),
        }))}
      />

      <StoryTable
        sectionTitle='State × Size (with icon)'
        firstColumnHeader='State'
        columnHeaders={COLUMN_HEADERS}
        rows={COMMON_STATES.map(({ key, extra }) => ({
          variantLabel: key,
          cells: SIZES.map(size => (
            <ChipAssist key={size} label='Label' size={size} icon={<SettingsSVG />} onClick={() => {}} {...extra} />
          )),
        }))}
      />
    </div>
  ),
};
