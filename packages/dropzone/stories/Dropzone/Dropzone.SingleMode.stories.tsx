import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Dropzone, UPLOAD_MODE } from '../../src';
import { SlotContent } from './SlotContent';
import styles from './styles.module.scss';

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone',
  component: Dropzone,
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const SingleMode: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wrapper}>
      <Dropzone mode={UPLOAD_MODE.Single} accept='image/*' onFilesUpload={() => {}}>
        <SlotContent />
      </Dropzone>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('# slot content')).toBeVisible();
  },
};
