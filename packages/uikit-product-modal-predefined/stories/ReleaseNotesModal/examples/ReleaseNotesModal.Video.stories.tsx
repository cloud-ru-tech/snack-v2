import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { RELEASE_NOTES_ITEMS } from '../../mockData';

const meta: Meta<typeof ReleaseNotesModal> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotesModal/Examples/Video',
  component: ReleaseNotesModal,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotesModal>;

export const Video: Story = {
  tags: ['dev'],
  args: {
    open: true,
    onClose: () => undefined,
    items: [
      {
        ...RELEASE_NOTES_ITEMS[0],
        video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
    ],
  },
};
