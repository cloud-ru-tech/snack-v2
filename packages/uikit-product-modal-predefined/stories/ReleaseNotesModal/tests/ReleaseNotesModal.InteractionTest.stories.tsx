import { ReleaseNotesModal, TEST_IDS } from '@ds/uikit-product-modal-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { RELEASE_NOTES_ITEMS } from '../../mockData';

const onSlideChange = fn();
const onReadLaterClick = fn();
const onDataErrorRetryClick = fn();

const meta: Meta<typeof ReleaseNotesModal> = {
  title: 'Uikit Product/ModalPredefined/ReleaseNotesModal/Tests/Interaction',
  component: ReleaseNotesModal,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotesModal>;

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

export const ErrorRetryInteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    open: true,
    onClose: fn(),
    items: RELEASE_NOTES_ITEMS,
    contentState: 'error',
    onDataErrorRetryClick,
  },
  play: async ({ step }) => {
    const body = within(document.body);

    await step('retry calls callback', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.releaseNotesRetryButton));
      await waitFor(() => expect(onDataErrorRetryClick).toHaveBeenCalled());
    });
  },
};
