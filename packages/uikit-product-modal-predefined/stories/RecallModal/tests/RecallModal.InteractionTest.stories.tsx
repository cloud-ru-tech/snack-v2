import { RecallModal, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const onRecall = fn();

const meta: Meta<typeof RecallModal> = {
  title: 'Uikit Product/ModalPredefined/RecallModal/Tests/Interaction',
  component: RecallModal,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof RecallModal>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    open: true,
    onClose: fn(),
    confirmable: true,
    confirmText: 'recall-operation-01',
    onRecall,
  },
  play: async ({ step }) => {
    const body = within(document.body);

    await step('invalid confirm keeps modal open', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.approveButton));
      await waitFor(() => expect(body.getByTestId(TEST_IDS.recallModal)).toBeVisible());
      await expect(onRecall).not.toHaveBeenCalled();
    });

    await step('valid confirm calls onRecall', async () => {
      const inputRoot = body.getByTestId(TEST_IDS.confirmInput);
      await userEvent.type(within(inputRoot).getByRole('textbox'), 'recall-operation-01');
      await userEvent.click(body.getByTestId(TEST_IDS.approveButton));
      await waitFor(() => expect(onRecall).toHaveBeenCalled());
    });
  },
};
