import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const SimpleContent = () => <div className={styles.content}>Содержимое dropdown</div>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Placement'
        firstColumnHeader='Opened'
        columnHeaders={['bottom-start', 'bottom', 'bottom-end']}
        rows={[
          {
            variantLabel: 'open',
            cells: (['bottom-start', 'bottom', 'bottom-end'] as const).map(placement => (
              <div key={placement} className={styles.cell}>
                <Dropdown open placement={placement} content={<SimpleContent />}>
                  <Button label={placement} />
                </Dropdown>
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='States'
        firstColumnHeader='Opened'
        columnHeaders={['loading', 'not-found']}
        rows={[
          {
            variantLabel: 'open',
            cells: [
              <div key='loading' className={styles.cell}>
                <Dropdown open state={{ type: STATE.Loading }} content={null}>
                  <Button label='loading' />
                </Dropdown>
              </div>,
              <div key='not-found' className={styles.cell}>
                <Dropdown open state={{ type: STATE.NotFound, description: 'Ничего не найдено' }} content={null}>
                  <Button label='not-found' />
                </Dropdown>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
