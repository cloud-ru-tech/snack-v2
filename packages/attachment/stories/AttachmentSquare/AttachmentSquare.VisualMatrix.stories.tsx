import { AttachmentSquare, AttachmentSquareProps, SIZE } from '@ds/attachment';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import { SAMPLE_TEXT_FILE, useSampleImageFile } from '../sampleFiles';
import styles from './stories.module.scss';

const meta: Meta<typeof AttachmentSquare> = {
  title: 'Components/Attachment/AttachmentSquare',
  component: AttachmentSquare,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof AttachmentSquare>;

const keySizes = [SIZE.S, SIZE.M] as const;

const states: Array<{ key: string; extra: Partial<AttachmentSquareProps> }> = [
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
              <AttachmentSquare
                key={size}
                file={file}
                size={size}
                onDownload={fn()}
                onDelete={fn()}
                onRetry={fn()}
                title='Label text'
                description='Description text'
                {...extra}
              />
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
