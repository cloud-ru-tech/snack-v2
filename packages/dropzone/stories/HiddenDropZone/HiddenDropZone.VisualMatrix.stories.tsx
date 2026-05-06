import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { HiddenDropZone, UPLOAD_MODE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof HiddenDropZone> = {
  title: 'Components/Dropzone/HiddenDropZone',
  component: HiddenDropZone,
};

export default meta;

type Story = StoryObj<typeof HiddenDropZone>;

const renderForm = (key: string, disabled = false) => (
  <HiddenDropZone key={key} disabled={disabled} mode={UPLOAD_MODE.Multiple} onFilesUpload={() => {}}>
    <div className={styles.card} data-test-id={`hidden-dropzone-${key}`}>
      <div className={styles.contentDescription}>Форма</div>
    </div>
  </HiddenDropZone>
);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='States'
      firstColumnHeader=''
      columnHeaders={['Default', 'Disabled']}
      rows={[
        {
          variantLabel: '',
          cells: [renderForm('default'), renderForm('disabled', true)],
        },
      ]}
    />
  ),
};
