import { ReleaseNotesBottomSheet, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { RELEASE_NOTES_ITEMS } from '../../mockData';

const onSlideChange = fn();
const onReadLaterClick = fn();

const meta: Meta<typeof ReleaseNotesBottomSheet> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotesBottomSheet/Tests/Interaction',
  component: ReleaseNotesBottomSheet,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotesBottomSheet>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    open: true,
    onClose: fn(),
    items: RELEASE_NOTES_ITEMS,
    onSlideChange,
    onReadLaterClick,
  },
  play: async ({ step }) => {
    const body = within(document.body);

    await step('next button changes slide', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.releaseNotesNextButton));
      await waitFor(() => expect(onSlideChange).toHaveBeenCalledWith(1));
    });

    await step('read later calls callback', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.releaseNotesReadLaterButton));
      await waitFor(() => expect(onReadLaterClick).toHaveBeenCalled());
    });
  },
};
