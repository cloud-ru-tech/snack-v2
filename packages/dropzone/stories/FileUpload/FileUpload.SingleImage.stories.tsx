import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { FileUpload, UPLOAD_MODE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Dropzone/FileUpload',
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const SingleImage: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wrapper}>
      <FileUpload mode={UPLOAD_MODE.Single} accept='image/*' onFilesUpload={() => {}}>
        <Button type='button' label='Выбрать изображение' />
      </FileUpload>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: /Выбрать изображение/ })).toBeVisible();
  },
};
