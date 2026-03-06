import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Dropzone, DropzoneProps, SIZE, UPLOAD_MODE } from '../../src';
import { SlotContent } from './SlotContent';
import styles from './styles.module.scss';

const slotContent = <SlotContent />;

const meta: Meta<DropzoneProps> = {
  title: 'Components/Dropzone/Dropzone',
  component: Dropzone,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=4971-5434&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<DropzoneProps>;

const sizes = Object.values(SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Size'
        firstColumnHeader=''
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: '',
            cells: sizes.map(size => (
              <div key={size} className={styles.dropzoneCell}>
                <Dropzone size={size} mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
                  {slotContent}
                </Dropzone>
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='States'
        firstColumnHeader=''
        columnHeaders={['Default', 'Disabled']}
        rows={[
          {
            variantLabel: '',
            cells: [
              <div key='default' className={styles.dropzoneCell}>
                <Dropzone mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
                  {slotContent}
                </Dropzone>
              </div>,
              <div key='disabled' className={styles.dropzoneCell}>
                <Dropzone disabled mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
                  {slotContent}
                </Dropzone>
              </div>,
            ],
          },
        ]}
      />
    </>
  ),
};
