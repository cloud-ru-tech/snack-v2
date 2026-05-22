import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { FileUpload, UPLOAD_MODE } from '../../../src';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Dropzone/FileUpload/Examples/SingleImage',
  component: FileUpload,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const SingleImage: Story = {
  tags: ['dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>SingleImage</DemoTitle>
        <DemoHint>{'Загрузка одного изображения через FileUpload с accept=image/*.'}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.wrapper}>
            <FileUpload
              data-test-id={TEST_IDS.fileUpload.root}
              mode={UPLOAD_MODE.Single}
              accept='image/*'
              onFilesUpload={() => {}}
            >
              <Button data-test-id={TEST_IDS.fileUpload.trigger} type='button' label='Выбрать изображение' />
            </FileUpload>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fileUpload.trigger)).toBeVisible();
  },
};
