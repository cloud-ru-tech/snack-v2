import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { TRUNCATE_STRING_TEST_ID } from './testIds';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

const SAMPLE = 'Название длинного файла или заголовка, которое не помещается в строку';

export const EndTruncation: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.container}>
      <TruncateString variant={VARIANT.End} text={SAMPLE} maxLines={1} data-test-id={TRUNCATE_STRING_TEST_ID} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TRUNCATE_STRING_TEST_ID)).toBeVisible();
  },
};
