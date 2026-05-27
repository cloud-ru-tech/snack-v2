import { Attachment, AttachmentProps, SIZE } from '@ds/attachment';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import { SAMPLE_TEXT_FILE, useSampleImageFile } from '../sampleFiles';
import styles from './stories.module.scss';

const meta: Meta<typeof Attachment> = {
  title: 'Components/Attachment/Attachment',
  component: Attachment,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Attachment>;

const keySizes = [SIZE.S, SIZE.M] as const;

const states: Array<{ key: string; extra: Partial<AttachmentProps> }> = [
  { key: 'default', extra: {} },
  { key: 'checked', extra: { checked: true } },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'error', extra: { error: 'Hint text' } },
  { key: 'loading', extra: { loading: true } },
];

function MatrixView() {
  const imageFile = useSampleImageFile();
  const compositions: Array<{ key: string; file?: File }> = [
    { key: 'icon', file: SAMPLE_TEXT_FILE },
    { key: 'image', file: imageFile },
  ];

  return (
    <div className={styles.grid}>
      {compositions.map(({ key, file }) => (
        <StoryTable
          key={key}
          sectionTitle={`State × Size (beforeContent = ${key})`}
          firstColumnHeader='State'
          columnHeaders={keySizes.map(s => s.toUpperCase())}
          rows={states.map(({ key: stateKey, extra }) => ({
            variantLabel: stateKey,
            cells: keySizes.map(size => (
              <div key={size} className={styles.cell}>
                <Attachment
                  file={file}
                  size={size}
                  title='Label text'
                  description='Description text'
                  onDownload={fn()}
                  onDelete={fn()}
                  onRetry={fn()}
                  {...extra}
                />
              </div>
            )),
          }))}
        />
      ))}
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => <MatrixView />,
};
