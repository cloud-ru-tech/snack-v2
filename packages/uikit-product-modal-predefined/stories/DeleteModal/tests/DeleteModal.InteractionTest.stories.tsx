import { DeleteModal, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const onDelete = fn();

const meta: Meta<typeof DeleteModal> = {
  title: 'Uikit Product/ModalPredefined/DeleteModal/Tests/Interaction',
  component: DeleteModal,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    open: true,
    onClose: fn(),
    objectType: 'виртуальную машину',
    confirmable: true,
    confirmText: 'vm-production-01',
    onDelete,
  },
  play: async ({ step }) => {
    const body = within(document.body);

    await step('invalid confirm keeps modal open', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.approveButton));
      await waitFor(() => expect(body.getByTestId(TEST_IDS.deleteModal)).toBeVisible());
      await expect(onDelete).not.toHaveBeenCalled();
    });

    await step('valid confirm calls onDelete', async () => {
      const inputRoot = body.getByTestId(TEST_IDS.confirmInput);
      await userEvent.type(within(inputRoot).getByRole('textbox'), 'vm-production-01');
      await userEvent.click(body.getByTestId(TEST_IDS.approveButton));
      await waitFor(() => expect(onDelete).toHaveBeenCalled());
    });
  },
};
