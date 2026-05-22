import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

function ControlledRender({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Controlled</DemoTitle>
          <DemoHint>{'Controlled Drawer с парент-стейтом — статус синхронизируется с open/close.'}</DemoHint>
          <DemoActions align='center'>
            <div data-test-id={TEST_IDS.drawer.parentState}>{open ? 'open' : 'closed'}</div>
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
        onClose={() => setOpen(false)}
        title='Drawer title'
        content='Drawer body content'
      />
    </>
  );
}

const meta: Meta = {
  title: 'Components/Drawer/Drawer/Tests/Controlled',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj;

export const Controlled: Story = {
  tags: ['test', 'dev'],
  render: () => <ControlledRender />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const getState = () => canvas.getByTestId(TEST_IDS.drawer.parentState).textContent;

    await step('initial: parent state is closed', async () => {
      expect(getState()).toBe('closed');
    });

    await step('click: trigger opens drawer and updates parent state', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.drawer.triggerOpen));
      await waitFor(() => expect(getState()).toBe('open'));
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.drawer.root)).toBeVisible());
    });

    await step('click: close button closes drawer and updates parent state', async () => {
      const closeBtn = await waitFor(() => canvas.getByTestId(TEST_IDS.closeButton));
      await userEvent.click(closeBtn);
      await waitFor(() => expect(getState()).toBe('closed'), { timeout: 5000 });
    });
  },
};
