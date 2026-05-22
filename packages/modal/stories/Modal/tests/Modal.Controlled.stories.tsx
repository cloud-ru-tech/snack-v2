import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const M = TEST_IDS.modal;
const MODAL_TEST_ID = M.root;
const MODAL_TRIGGER_TEST_ID = M.triggerOpen;

const PARENT_STATE_TEST_ID = 'modal-parent-state';

function ControlledRender() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Controlled</DemoTitle>
          <DemoHint>{'Controlled Modal с парент-стейтом — статус синхронизируется с open/close.'}</DemoHint>
          <DemoActions align='center'>
            <div data-test-id={PARENT_STATE_TEST_ID}>{open ? 'open' : 'closed'}</div>
            <Button
              data-test-id={MODAL_TRIGGER_TEST_ID}
              label='Open modal'
              appearance='neutral'
              view='outline'
              onClick={() => setOpen(true)}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
      <Modal
        data-test-id={MODAL_TEST_ID}
        open={open}
        onClose={() => setOpen(false)}
        title='Modal title'
        content='Modal body content'
      />
    </>
  );
}

const meta: Meta = {
  title: 'Components/Modal/Modal/Tests/Controlled',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj;

export const Controlled: Story = {
  tags: ['test', 'dev'],
  render: () => <ControlledRender />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const getState = () => canvas.getByTestId(PARENT_STATE_TEST_ID).textContent;

    await step('initial: parent state is closed', async () => {
      expect(getState()).toBe('closed');
    });

    await step('click: trigger opens modal and updates parent state', async () => {
      await userEvent.click(canvas.getByTestId(MODAL_TRIGGER_TEST_ID));
      await waitFor(() => expect(getState()).toBe('open'));
      expect(within(document.body).getByTestId(M.body)).toBeVisible();
    });

    await step('click: close button closes modal and updates parent state', async () => {
      const closeButton = within(document.body).getByTestId(M.closeButton);
      await userEvent.click(closeButton);
      await waitFor(() => expect(getState()).toBe('closed'), { timeout: 5000 });
    });
  },
};
