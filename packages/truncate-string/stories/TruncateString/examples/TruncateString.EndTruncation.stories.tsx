import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString/Examples/EndTruncation',
  component: TruncateString,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

const SAMPLE = 'Название длинного файла или заголовка, которое не помещается в строку';

export const EndTruncation: Story = {
  tags: ['dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>EndTruncation</DemoTitle>
        <DemoHint>Текст обрезается с конца многоточием.</DemoHint>
        <DemoActions block>
          <div className={styles.container}>
            <TruncateString variant={VARIANT.End} text={SAMPLE} maxLines={1} data-test-id={TEST_IDS.root} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
