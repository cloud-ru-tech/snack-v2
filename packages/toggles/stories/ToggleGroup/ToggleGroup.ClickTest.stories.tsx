import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

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
];

function ClickTestRender() {
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

export const ClickTest: Story = {
  tags: ['test', 'dev'],
  render: () => <ClickTestRender />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Click item 1 selects it', async () => {
      await userEvent.click(canvas.getByText('item1'));
      expect(canvas.getByText('item1').parentElement).toHaveAttribute('data-checked', 'true');
    });

    await step('Click item 2 replaces selection', async () => {
      await userEvent.click(canvas.getByText('item2'));
      expect(canvas.getByText('item1').parentElement).toHaveAttribute('data-checked', 'false');
      expect(canvas.getByText('item2').parentElement).toHaveAttribute('data-checked', 'true');
    });
  },
};
