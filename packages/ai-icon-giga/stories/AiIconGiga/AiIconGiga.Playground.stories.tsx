import { AiIconGiga, VARIANT } from '@ds/ai-icon-giga';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiIconGiga> = {
  title: 'AI/IconGiga',
  component: AiIconGiga,
  parameters: { layout: 'fullscreen' },
  args: {
    variant: VARIANT.Neutral,
    size: 80,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    variant: { control: 'select', options: Object.values(VARIANT) },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Логотип GigaChat — монохром (neutral) или брендовый градиент (logoDark / logoLight).</DemoHint>
        <DemoActions align='center'>
          <AiIconGiga {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiIconGiga>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
