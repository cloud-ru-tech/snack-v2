import { AiHistoryLineIndicator } from '@ds/ai-history-line';
import { BulletListSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AiHistoryLineIndicator> = {
  title: 'Components/AiHistoryLine/AiHistoryLineIndicator',
  component: AiHistoryLineIndicator,
  args: { active: false },
  argTypes: { children: { table: { disable: true } } },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineIndicator>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <AiHistoryLineIndicator {...args}>
      <BulletListSVG aria-hidden />
    </AiHistoryLineIndicator>
  ),
};
