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

export const DisabledState: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wrapper}>
      <Dropzone disabled mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
        <SlotContent />
      </Dropzone>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('# slot content')).toBeVisible();
  },
};
