import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ToggleGroup } from '../../src';
import { ToggleCard } from './components/ToggleCard';
import styles from './styles.module.scss';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/Toggles/Toggle Group',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

const ITEMS = [
  { id: '1', label: 'item1' },
  { id: '2', label: 'item2' },
  { id: '3', label: 'item3' },
];

function SingleRender() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <ToggleGroup selectionMode='single' value={value} onChange={setValue}>
      <div className={styles.toggleGroup}>
        {ITEMS.map(p => (
          <ToggleCard key={p.id} {...p} />
        ))}
      </div>
    </ToggleGroup>
  );
}

export const Single: Story = {
  tags: ['dev'],
  render: () => <SingleRender />,
};
