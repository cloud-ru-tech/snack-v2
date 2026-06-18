import { RecallModal, RecallModalProps } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RecallModal> = {
  title: 'Uikit Product/ModalPredefined/RecallModal/Examples/Confirmable',
  component: RecallModal,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof RecallModal>;

const args: RecallModalProps = {
  open: true,
  onClose: () => undefined,
  confirmable: true,
  confirmText: 'recall-operation-01',
  onRecall: () => undefined,
};

export const Confirmable: Story = {
  tags: ['dev'],
  args,
};
