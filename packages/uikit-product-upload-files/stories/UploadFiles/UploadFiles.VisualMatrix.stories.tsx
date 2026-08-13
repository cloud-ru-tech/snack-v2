import { UploadFiles } from '@ds/uikit-product-upload-files';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { getScenarioProps, mockUpload, STORY_DEFAULTS, useSampleImageFile, VALIDATION_SCENARIOS } from './helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof UploadFiles> = {
  title: 'Uikit Product/UploadFiles',
  component: UploadFiles,
  globals: { language: 'ru-RU' },
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/50IRFfRacVGdvmr89tS5zV/uploadFiles--FF-8497-?node-id=4272-23558',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UploadFiles>;

function MatrixView() {
  const imageFile = useSampleImageFile();

  return (
    <StoryTable
      sectionTitle='Validation'
      firstColumnHeader='Validation'
      columnHeaders={['UploadFiles']}
      rows={VALIDATION_SCENARIOS.map(({ key, label }) => ({
        variantLabel: label,
        cells: [
          <div key={key} className={styles.uploadFilesStory}>
            <UploadFiles {...STORY_DEFAULTS} upload={mockUpload} {...getScenarioProps(key, imageFile)} />
          </div>,
        ],
      }))}
    />
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => <MatrixView />,
};
