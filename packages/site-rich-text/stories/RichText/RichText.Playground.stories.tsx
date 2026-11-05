import { RichText } from '@ds/site-rich-text';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { HTML_CONTENT } from './content';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof RichText> = {
  title: 'Site/RichText',
  component: RichText,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    content: HTML_CONTENT,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    content: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof RichText>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>HTML-строка из CMS: абзацы, ссылки, маркированные и нумерованные списки.</DemoHint>
        <DemoActions align='start'>
          <RichText {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
