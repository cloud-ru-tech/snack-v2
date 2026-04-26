import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DRAWER_TEST_ID, DRAWER_TRIGGER_TEST_ID } from './testIds';

type TestArgs = { onOpen: () => void; onClose: () => void };

function OpenCloseTestRender({ onOpen, onClose }: TestArgs) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        data-test-id={DRAWER_TRIGGER_TEST_ID}
        label='Open drawer'
        appearance='primary'
        view='filled'
        onClick={() => {
          onOpen();
          setOpen(true);
        }}
      />
      <Drawer
        data-test-id={DRAWER_TEST_ID}
        open={open}
        position='right'
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        title='Drawer title'
        content='Drawer body content'
      />
    </>
  );
}

const meta: Meta<TestArgs> = {
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<TestArgs>;

export const OpenCloseTest: Story = {
  tags: ['test', 'dev'],
  args: { onOpen: fn(), onClose: fn() },
  render: args => <OpenCloseTestRender {...args} />,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open drawer', async () => {
      await userEvent.click(canvas.getByTestId(DRAWER_TRIGGER_TEST_ID));
      expect(args.onOpen).toHaveBeenCalledTimes(1);
    });

    await step('Drawer content appears', async () => {
      await waitFor(() => {
        expect(within(document.body).getByTestId('drawer__body')).toBeVisible();
      });
    });

    await step('Close via close button', async () => {
      const closeButton = within(document.body).getByTestId('drawer__close-button');
      await userEvent.click(closeButton);
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });
  },
};
