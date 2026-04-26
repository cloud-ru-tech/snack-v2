import { Button } from '@ds/button';
import { Drawer, WIDTH, Width } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const widths: Width[] = [WIDTH.S, WIDTH.M, WIDTH.L];

function SizesRender() {
  const [active, setActive] = useState<Width | null>(null);

  return (
    <div className={styles.triggers}>
      {widths.map(width => (
        <Button
          key={width}
          label={`Width ${width.toUpperCase()}`}
          appearance='primary'
          view='outline'
          onClick={() => setActive(width)}
        />
      ))}
      <Drawer
        open={active !== null}
        position='right'
        width={active ?? WIDTH.S}
        onClose={() => setActive(null)}
        title={`Width: ${active ?? ''}`}
        subtitle='Предустановленные размеры s / m / l.'
        content='Для нестандартной ширины можно передать число (px) или строку с единицами.'
      />
    </div>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => <SizesRender />,
  play: async ({ canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole('button');
    expect(buttons).toHaveLength(widths.length);
  },
};
