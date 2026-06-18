import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { RELEASE_NOTES_ITEMS } from '../../mockData';

const meta: Meta<typeof ReleaseNotesModal> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotesModal/Examples/ContentStates',
  component: ReleaseNotesModal,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotesModal>;

export const Data: Story = {
  tags: ['dev'],
  args: {
    open: true,
    onClose: () => undefined,
    contentState: 'data',
    items: RELEASE_NOTES_ITEMS,
  },
};

export const NoData: Story = {
  tags: ['dev'],
  args: {
    open: true,
    onClose: () => undefined,
    contentState: 'noData',
    items: RELEASE_NOTES_ITEMS,
  },
};

export const Error: Story = {
  tags: ['dev'],
  args: {
    open: true,
    onClose: () => undefined,
    contentState: 'error',
    items: RELEASE_NOTES_ITEMS,
  },
};
