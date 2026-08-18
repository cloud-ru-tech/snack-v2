import { AI_TOOL_BADGE_TYPE, AiToolBadge } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolBadge> = {
  title: 'AI/AiTool/Atoms/AiToolBadge',
  component: AiToolBadge,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'resource-name',
    badgeType: AI_TOOL_BADGE_TYPE.CloudRu,
    'data-test-id': TEST_IDS.badge,
  },
  argTypes: {
    as: { table: { disable: true } },
    innerRef: { table: { disable: true } },
    href: { table: { disable: true } },
    target: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Ссылка на ресурс в выводе инструмента. Иконка слева зависит от badgeType, при наведении подсвечивается фон.
        </DemoHint>
        <DemoActions align='center'>
          <AiToolBadge {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiToolBadge>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.badge)).toBeVisible();
  },
};
