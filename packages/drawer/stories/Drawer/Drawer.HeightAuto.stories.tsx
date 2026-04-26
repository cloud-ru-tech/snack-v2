import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DRAWER_TEST_ID, DRAWER_TRIGGER_TEST_ID } from './testIds';

function HeightAutoRender() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        data-test-id={DRAWER_TRIGGER_TEST_ID}
        label='Open bottom sheet'
        appearance='primary'
        view='filled'
        onClick={() => setOpen(true)}
      />
      <Drawer
        data-test-id={DRAWER_TEST_ID}
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
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const HeightAuto: Story = {
  tags: ['dev'],
  render: () => <HeightAutoRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DRAWER_TRIGGER_TEST_ID)).toBeVisible();
  },
};
