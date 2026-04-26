import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { HiddenDropZone, UPLOAD_MODE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof HiddenDropZone> = {
  title: 'Components/Dropzone/HiddenDropZone',
  component: HiddenDropZone,
};

export default meta;

type Story = StoryObj<typeof HiddenDropZone>;

export const DisabledState: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wrapper}>
      <HiddenDropZone disabled mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
        <div className={styles.card} data-test-id='hidden-dropzone-form'>
          <div className={styles.contentDescription}>Заблокированная область формы</div>
        </div>
      </HiddenDropZone>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('hidden-dropzone-form')).toBeVisible();
  },
};
