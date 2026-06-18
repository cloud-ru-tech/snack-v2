import { DeleteModal, DeleteModalProps } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeleteModal> = {
  title: 'Uikit Product/ModalPredefined/DeleteModal/Examples/Confirmable',
  component: DeleteModal,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

const args: DeleteModalProps = {
  open: true,
  onClose: () => undefined,
  objectType: 'виртуальную машину',
  confirmable: true,
  confirmText: 'vm-production-01',
  onDelete: () => undefined,
};

export const Confirmable: Story = {
  tags: ['dev'],
  args,
};
