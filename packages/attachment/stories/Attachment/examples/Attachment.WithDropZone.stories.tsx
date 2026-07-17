import { Attachment } from '@ds/attachment';
import { Button } from '@ds/button';
import { FileUpload } from '@ds/dropzone';
import { UploadSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from './withDropZone.module.scss';

const meta: Meta<typeof Attachment> = {
  title: 'Components/Attachment/Attachment/Examples/WithDropZone',
  component: Attachment,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Attachment>;

function WithDropZoneDemo() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = useCallback((picked: File[]) => {
    setFiles(prev => [...prev, ...picked]);
  }, []);

  const handleDelete = useCallback((target: File | undefined) => {
    if (!target) return;
    setFiles(prev => prev.filter(f => f !== target));
  }, []);

  const handleDownload = useCallback((file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithDropZone</DemoTitle>
        <DemoHint>FileUpload пушит выбранные файлы в state; каждый рендерится как Attachment с onDelete.</DemoHint>
        <DemoActions align='start'>
          <FileUpload onFilesUpload={handleUpload}>
            <Button label='Прикрепить файлы' icon={<UploadSVG />} iconPosition='before' view='outline' />
          </FileUpload>
        </DemoActions>

        {files.length > 0 && (
          <ul className={styles.list}>
            {files.map(file => (
              <li key={`${file.name}-${file.lastModified}-${file.size}`}>
                <Attachment
                  file={file}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                  data-test-id={`${TEST_IDS.attachment.root}-uploaded`}
                />
              </li>
            ))}
          </ul>
        )}
      </DemoPanel>
    </DemoPage>
  );
}

export const WithDropZone: Story = {
  tags: ['dev', 'test'],
  render: () => <WithDropZoneDemo />,
};
