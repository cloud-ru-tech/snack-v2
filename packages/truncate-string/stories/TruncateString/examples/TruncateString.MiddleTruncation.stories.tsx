import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString/Examples/MiddleTruncation',
  component: TruncateString,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

export const MiddleTruncation: Story = {
  tags: ['dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>MiddleTruncation</DemoTitle>
        <DemoHint>Сохраняет начало и конец строки, обрезает середину.</DemoHint>
        <DemoActions block>
          <div className={styles.container}>
            <TruncateString
              variant={VARIANT.Middle}
              text='very-long-file-name-with-identifier-abc123.zip'
              data-test-id={TEST_IDS.root}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
