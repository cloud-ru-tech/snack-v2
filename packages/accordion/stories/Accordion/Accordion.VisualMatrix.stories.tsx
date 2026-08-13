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

function blocks(mode: string) {
  return (
    <div className={styles.listM}>
      <Accordion.CollapseBlockPrimary id={`${mode}-1`} title='Item 1' subTitle='Subtitle'>
        <p className={styles.content}>Содержимое первого блока.</p>
      </Accordion.CollapseBlockPrimary>
      <Accordion.CollapseBlockPrimary id={`${mode}-2`} title='Item 2' subTitle='Subtitle'>
        <p className={styles.content}>Содержимое второго блока.</p>
      </Accordion.CollapseBlockPrimary>
      <Accordion.CollapseBlockPrimary id={`${mode}-3`} title='Item 3' subTitle='Subtitle'>
        <p className={styles.content}>Содержимое третьего блока.</p>
      </Accordion.CollapseBlockPrimary>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Selection mode'
      firstColumnHeader='Mode'
      columnHeaders={['Accordion']}
      // Раскрытые по умолчанию блоки — единственный способ увидеть ось статикой:
      // `single` держит открытым один блок, `multiple` — несколько.
      rows={modes.map(mode => ({
        variantLabel: mode,
        cells: [
          mode === SELECTION_MODE.Multiple ? (
            <Accordion key={mode} selectionMode={mode} expandedDefault={[`${mode}-1`, `${mode}-2`]}>
              {blocks(mode)}
            </Accordion>
          ) : (
            <Accordion key={mode} selectionMode={mode} expandedDefault={`${mode}-1`}>
              {blocks(mode)}
            </Accordion>
          ),
        ],
      }))}
    />
  ),
};
