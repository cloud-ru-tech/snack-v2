import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

function HeightAutoRender() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open bottom sheet' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='bottom'
        heightAuto
        onClose={() => setOpen(false)}
        title='Bottom sheet'
        subtitle='Высота панели рассчитывается по контенту при position="bottom" | "top".'
        content='Подходит для компактных подтверждений и коротких действий на мобильных устройствах.'
      />
    </>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const HeightAuto: Story = {
  tags: ['dev'],
  render: () => <HeightAutoRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open bottom sheet' })).toBeVisible();
  },
};
