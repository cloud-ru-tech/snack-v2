import { AiCodeDiff, SIZE } from '@ds/ai-code-diff';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiCodeDiff> = {
  title: 'AI/AiCodeDiff',
  component: AiCodeDiff,
  parameters: { layout: 'centered' },
  args: {
    added: 83,
    removed: 26,
    separator: '/',
    size: SIZE.M,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    added: { control: { type: 'number', min: 0, step: 1 } },
    removed: { control: { type: 'number', min: 0, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof AiCodeDiff>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
