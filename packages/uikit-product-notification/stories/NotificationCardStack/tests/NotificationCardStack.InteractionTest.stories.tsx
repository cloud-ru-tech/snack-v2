import { APPEARANCE, NotificationCard, NotificationCardStack } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const cards = [
  <NotificationCard key='1' id='s1' title='Событие 1' description='c' date='today' appearance={APPEARANCE.Default} />,
  <NotificationCard key='2' id='s2' title='Событие 2' description='c' date='today' appearance={APPEARANCE.Default} />,
  <NotificationCard key='3' id='s3' title='Событие 3' description='c' date='today' appearance={APPEARANCE.Default} />,
];

const meta: Meta<typeof NotificationCardStack> = {
  title: 'Uikit Product/Notification/NotificationCardStack/Tests/Interaction',
  component: NotificationCardStack,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    title: 'cluster',
    onOpenChanged: fn(),
    children: cards,
    actions: [
      { content: { label: 'Прочитать всё' }, onClick: fn() },
      { content: { label: 'Скрыть' }, onClick: fn() },
    ],
    'data-test-id': TEST_IDS.panel.cardStack.wrapper,
  },
};
export default meta;
type Story = StoryObj<typeof NotificationCardStack>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Раскрытие стопки по заголовку/кнопке и меню действий.</DemoHint>
        <DemoActions align='center'>
          <NotificationCardStack {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('click: title toggles open state', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.panel.cardStack.title));
      expect(args.onOpenChanged).toHaveBeenCalledWith(true);
    });

    await step('click: open button toggles back', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.panel.cardStack.openButton));
      expect(args.onOpenChanged).toHaveBeenCalledWith(false);
    });

    await step('click: actions droplist opens and action triggers onClick', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.panel.cardStack.actions.droplistTrigger));
      const action = await waitFor(() => body.getByTestId(`${TEST_IDS.panel.cardStack.actions.droplistAction}-0`));
      await userEvent.click(action);
      expect(args.actions?.[0]?.onClick).toHaveBeenCalledTimes(1);
    });
  },
};
