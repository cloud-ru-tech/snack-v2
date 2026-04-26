import { Button } from '@ds/button';
import { Drawer, POSITION, Position } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { DRAWER_TEST_ID } from './testIds';

const positions: Position[] = [POSITION.Left, POSITION.Right, POSITION.Top, POSITION.Bottom];

function PositionsRender() {
  const [active, setActive] = useState<Position | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.triggers}>
      {positions.map(position => (
        <Button
          key={position}
          data-test-id={`drawer-trigger-${position}`}
          label={position}
          appearance='primary'
          view='outline'
          onClick={() => {
            setActive(position);
            setOpen(true);
          }}
        />
      ))}
      <Drawer
        data-test-id={DRAWER_TEST_ID}
        open={open}
        position={active ?? POSITION.Right}
        onClose={() => setOpen(false)}
        title={`Position: ${active ?? ''}`}
        subtitle='Панель появляется со стороны, заданной position.'
        content='Используйте для боковых панелей, нижних листов (bottom sheets) и панелей-обзоров.'
      />
    </div>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Positions: Story = {
  tags: ['dev'],
  render: () => <PositionsRender />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const position of positions) {
      await expect(canvas.getByTestId(`drawer-trigger-${position}`)).toBeVisible();
    }
  },
};
