import { AI_TOOL_BADGE_TYPE, AiToolBadge } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof AiToolBadge> = {
  title: 'AI/AiTool/Atoms/AiToolBadge/Examples/Polymorphic',
  component: AiToolBadge,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof AiToolBadge>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Polymorphic</DemoTitle>
        <DemoHint>Бейдж как ссылка: as=&apos;a&apos; + href + target.</DemoHint>
        <DemoActions align='center'>
          <AiToolBadge
            as='a'
            href='/cloud-resource'
            target='_blank'
            badgeType={AI_TOOL_BADGE_TYPE.CloudRu}
            label='resource-name'
            data-test-id={TEST_IDS.badge}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const badge = within(canvasElement).getByTestId(TEST_IDS.badge);
    await expect(badge).toHaveAttribute('href', '/cloud-resource');
  },
};
