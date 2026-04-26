import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Dropzone, UPLOAD_MODE } from '../../src';
import { SlotContent } from './SlotContent';
import styles from './styles.module.scss';
import { DROPZONE_SLOT_CONTENT_TEST_ID, DROPZONE_TEST_ID } from './testIds';

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone/Dropzone',
  component: Dropzone,
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const SingleMode: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wrapper}>
      <Dropzone data-test-id={DROPZONE_TEST_ID} mode={UPLOAD_MODE.Single} accept='image/*' onFilesUpload={() => {}}>
        <SlotContent />
      </Dropzone>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DROPZONE_SLOT_CONTENT_TEST_ID)).toBeVisible();
  },
};
