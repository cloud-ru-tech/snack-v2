import { AiCard, AiCardProps } from '@ds/ai-card';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiCard> = {
  title: 'AI/AiCard',
  component: AiCard,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Card title',
    children: 'Default content',
    checked: false,
    disabled: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    onChange: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  render: function Render(args: AiCardProps) {
    const [{ checked }, updateArgs] = useArgs<AiCardProps>();
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Выбираемая AI-карточка — клик / Enter / Space переключают checked.</DemoHint>
          <DemoActions align='center'>
            <AiCard {...args} checked={checked} onChange={(next: boolean) => updateArgs({ checked: next })} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AiCard>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
