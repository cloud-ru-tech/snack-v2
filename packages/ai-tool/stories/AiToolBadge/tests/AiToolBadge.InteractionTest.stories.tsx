import { AI_TOOL_BADGE_TYPE, AiToolBadge } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof AiToolBadge> = {
  title: 'AI/AiToolElements/Atoms/AiToolBadge/Tests/Interaction',
  component: AiToolBadge,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'resource-name',
    badgeType: AI_TOOL_BADGE_TYPE.CloudRu,
    onClick: fn(),
    'data-test-id': TEST_IDS.badge,
  },
};

export default meta;
type Story = StoryObj<typeof AiToolBadge>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>Проверяет, что нажатие на бейдж вызывает обработчик клика.</DemoHint>
        <DemoActions align='center'>
          {/* onClick зовём без события: spy не хранит MouseEvent, иначе Storybook падает на сериализации event.view (cross-origin) в Interactions-панели */}
          <AiToolBadge {...args} onClick={() => args.onClick?.()} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click badge: onClick fires', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.badge));
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};
