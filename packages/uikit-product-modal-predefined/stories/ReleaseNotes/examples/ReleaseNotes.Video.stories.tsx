import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { RELEASE_NOTES_ITEMS } from '../../mockData';

const meta: Meta<typeof ReleaseNotes> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotes/Examples/Video',
  component: ReleaseNotes,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotes>;

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
