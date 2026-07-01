import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { RELEASE_NOTES_ITEMS } from '../../mockData';

const meta: Meta<typeof ReleaseNotes> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotes/Examples/ContentStates',
  component: ReleaseNotes,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotes>;

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
