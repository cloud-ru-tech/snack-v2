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
        firstColumnHeader='Placement'
        columnHeaders={['Dropdown']}
        rows={(['bottom-start', 'bottom', 'bottom-end'] as const).map(placement => ({
          variantLabel: placement,
          cells: [
            <Dropdown key={placement} open placement={placement} content={<SimpleContent />}>
              <Button label={placement} />
            </Dropdown>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='States'
        firstColumnHeader='State'
        columnHeaders={['Dropdown']}
        rows={[
          {
            variantLabel: 'loading',
            cells: [
              <Dropdown key='loading' open state={{ type: STATE.Loading }} content={null}>
                <Button label='loading' />
              </Dropdown>,
            ],
          },
          {
            variantLabel: 'not-found',
            cells: [
              <Dropdown
                key='not-found'
                open
                state={{ type: STATE.NotFound, description: 'Ничего не найдено' }}
                content={null}
              >
                <Button label='not-found' />
              </Dropdown>,
            ],
          },
        ]}
      />
    </div>
  ),
};
