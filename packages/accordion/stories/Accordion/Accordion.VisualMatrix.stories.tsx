import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Accordion } from '../../src';
import { SELECTION_MODE } from '../../src/constants';
import styles from '../styles.module.scss';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion/Accordion',
  component: Accordion,
  parameters: { controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const modes = Object.values(SELECTION_MODE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Selection mode'
      firstColumnHeader='Mode'
      columnHeaders={['Accordion']}
      rows={modes.map(mode => ({
        variantLabel: mode,
        cells: [
          <Accordion key={mode} selectionMode={mode}>
            <div className={styles.listM}>
              <Accordion.CollapseBlockPrimary id={`${mode}-1`} title='Item 1' subTitle='Subtitle' />
              <Accordion.CollapseBlockPrimary id={`${mode}-2`} title='Item 2' subTitle='Subtitle' />
              <Accordion.CollapseBlockPrimary id={`${mode}-3`} title='Item 3' subTitle='Subtitle' />
            </div>
          </Accordion>,
        ],
      }))}
    />
  ),
};
