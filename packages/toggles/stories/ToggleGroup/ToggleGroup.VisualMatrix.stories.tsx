import { ToggleGroup } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';

import { ToggleCard } from './components/ToggleCard';
import styles from './styles.module.scss';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/Toggles/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

const ITEMS = [
  { id: '1', label: 'item1' },
  { id: '2', label: 'item2' },
  { id: '3', label: 'item3' },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <ToggleGroup selectionMode='single' value='2'>
        <div className={styles.toggleGroup}>
          {ITEMS.map(p => (
            <ToggleCard key={p.id} {...p} />
          ))}
        </div>
      </ToggleGroup>
      <ToggleGroup selectionMode='multiple' value={['1', '3']}>
        <div className={styles.toggleGroup}>
          {ITEMS.map(p => (
            <ToggleCard key={p.id} {...p} />
          ))}
        </div>
      </ToggleGroup>
    </div>
  ),
};
