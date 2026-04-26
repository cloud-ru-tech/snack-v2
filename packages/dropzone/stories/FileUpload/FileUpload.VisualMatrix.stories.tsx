import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { FileUpload, UPLOAD_MODE } from '../../src';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Dropzone/FileUpload',
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Mode'
      firstColumnHeader=''
      columnHeaders={['Single', 'Multiple']}
      rows={[
        {
          variantLabel: '',
          cells: [
            <FileUpload key='single' mode={UPLOAD_MODE.Single} onFilesUpload={() => {}}>
              <Button type='button' label='Один файл' />
            </FileUpload>,
            <FileUpload key='multi' mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
              <Button type='button' label='Несколько файлов' />
            </FileUpload>,
          ],
        },
      ]}
    />
  ),
};
