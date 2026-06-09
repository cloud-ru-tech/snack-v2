import { CardVacancy } from '@ds/site-card-vacancy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof CardVacancy> = {
  title: 'Site/CardVacancy/Tests/Interaction',
  component: CardVacancy,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    as: 'button',
    title: 'Frontend Developer',
    description: 'Remote · Full-time',
    onClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof CardVacancy>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по карточке вызывает onClick; Tab переводит на неё фокус.</DemoHint>
        <DemoActions block>
          <CardVacancy {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);

    await step('click: triggers onClick once', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Tab focuses the card', async () => {
      root.blur();
      await userEvent.tab();
      await expect(root).toHaveFocus();
    });

    await step('keyboard: Enter triggers onClick again', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  },
};
