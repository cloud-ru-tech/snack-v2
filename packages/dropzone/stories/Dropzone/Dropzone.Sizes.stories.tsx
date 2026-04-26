import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Dropzone, SIZE, UPLOAD_MODE } from '../../src';
import { SlotContent } from './SlotContent';
import styles from './styles.module.scss';

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone/Dropzone',
  component: Dropzone,
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      {Object.values(SIZE).map(size => (
        <div key={size} className={styles.dropzoneCell}>
          <Dropzone size={size} mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
            <SlotContent />
          </Dropzone>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const items = within(canvasElement).getAllByText('# slot content');
    expect(items).toHaveLength(3);
  },
};
