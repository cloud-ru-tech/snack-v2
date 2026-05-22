import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

type TestArgs = { onClose: () => void };

function InteractionRender({ onClose }: TestArgs) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DemoPage>
        <DemoPanel>
          <DemoTitle>InteractionTest</DemoTitle>
          <DemoHint>{'Открытие Drawer по триггеру и закрытие через close-кнопку.'}</DemoHint>
          <DemoActions align='center'>
            <Button
              data-test-id={TEST_IDS.drawer.triggerOpen}
              label='Open drawer'
              appearance='neutral'
              view='outline'
              onClick={() => setOpen(true)}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
      <Drawer
        data-test-id={TEST_IDS.drawer.root}
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
  title: 'Components/Drawer/Drawer/Tests/Interaction',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onClose: fn() },
  render: args => <InteractionRender {...args} />,
};
export default meta;

type Story = StoryObj<TestArgs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    // Drawer renders into a portal scoped by PortalContextProvider in preview.tsx,
    // so close-button is inside canvasElement (story wrapper as portal root).
    const trigger = canvas.getByTestId(TEST_IDS.drawer.triggerOpen);

    await step('click: trigger opens drawer', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.drawer.root)).toBeVisible());
    });

    await step('click: close button fires onClose', async () => {
      const closeBtn = await waitFor(() => canvas.getByTestId(TEST_IDS.closeButton));
      await userEvent.click(closeBtn);
      await waitFor(() => expect(args.onClose).toHaveBeenCalled());
    });
  },
};
