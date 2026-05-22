import { Button } from '@ds/button';
import { Modal, MODE } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const M = TEST_IDS.modal;
const MODAL_TEST_ID = M.root;
const MODAL_TRIGGER_TEST_ID = M.triggerOpen;

type ModeValue = (typeof MODE)[keyof typeof MODE];

type TestArgs = {
  onClose: () => void;
  onBackButtonClick: () => void;
  mode: ModeValue;
  showBackButton: boolean;
};

function InteractionRender({ onClose, onBackButtonClick, mode, showBackButton }: TestArgs) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DemoPage>
        <DemoPanel>
          <DemoTitle>InteractionTest</DemoTitle>
          <DemoHint>{'Открытие Modal, закрытие через overlay, Escape, close- и back-кнопки.'}</DemoHint>
          <DemoActions align='center'>
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
        mode={mode}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        onBackButtonClick={showBackButton ? onBackButtonClick : undefined}
        title='Modal title'
        content='Modal body content'
      />
    </>
  );
}

const meta: Meta<TestArgs> = {
  title: 'Components/Modal/Modal/Tests/Interaction',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onClose: fn(),
    onBackButtonClick: fn(),
    mode: MODE.Regular,
    showBackButton: true,
  },
  render: args => <InteractionRender {...args} />,
};
export default meta;

type Story = StoryObj<TestArgs>;

async function openModal(args: TestArgs, canvas: ReturnType<typeof within>) {
  await userEvent.click(canvas.getByTestId(MODAL_TRIGGER_TEST_ID));
  await waitFor(() => {
    expect(within(document.body).getByTestId(M.body)).toBeVisible();
  });
  (args.onClose as ReturnType<typeof fn>).mockClear();
  (args.onBackButtonClick as ReturnType<typeof fn>).mockClear();
}

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: overlay click in regular mode triggers onClose', async () => {
      await openModal(args, canvas);
      const overlay = within(document.body).getByTestId(M.overlay);
      await userEvent.click(overlay);
      await waitFor(() => {
        expect(args.onClose).toHaveBeenCalledTimes(1);
      });
    });

    await step('click: close button triggers onClose', async () => {
      await openModal(args, canvas);
      const closeButton = within(document.body).getByTestId(M.closeButton);
      await userEvent.click(closeButton);
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Escape in regular mode triggers onClose', async () => {
      await openModal(args, canvas);
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(args.onClose).toHaveBeenCalledTimes(1);
      });
    });

    await step('click: back button triggers onBackButtonClick', async () => {
      await openModal(args, canvas);
      const backButton = within(document.body).getByTestId(M.backButton);
      await userEvent.click(backButton);
      expect(args.onBackButtonClick).toHaveBeenCalledTimes(1);
      // Close modal for clean state
      const closeButton = within(document.body).getByTestId(M.closeButton);
      await userEvent.click(closeButton);
    });
  },
};
