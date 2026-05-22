import { COPY_BUTTON_HIDE_STRATEGY, CopyLine } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof CopyLine> = {
  title: 'Uikit Product/Copy/CopyLine/Tests/Interaction',
  component: CopyLine,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CopyLine>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    content: 'value-to-copy',
    onClick: fn(),
    'data-test-id': TEST_IDS.copyLine.root,
    copyButtonHideStrategy: COPY_BUTTON_HIDE_STRATEGY.Never,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по строке копирует значение и вызывает onClick.</DemoHint>
        <DemoActions block>
          <CopyLine {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.copyLine.root);
    const copyButton = canvas.getByTestId(TEST_IDS.copyLine.copyButton);

    await step('click: root fires onClick', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalled();
    });

    await step('click: inner copy button is reachable and clickable', async () => {
      // Click на внутреннюю copy-кнопку запускает copy-action (через clipboard
      // API), но НЕ всплывает до root onClick — copyButton делает stopPropagation.
      // Поэтому здесь проверяем только, что элемент доступен и кликабелен; mock
      // root onClick остаётся неизменным.
      const callsBefore = (args.onClick as ReturnType<typeof fn>).mock.calls.length;
      await userEvent.click(copyButton);
      expect((args.onClick as ReturnType<typeof fn>).mock.calls.length).toBe(callsBefore);
    });

    await step('keyboard: Tab focuses the inner copy button', async () => {
      root.blur();
      copyButton.blur();
      await userEvent.tab();
      await expect(copyButton).toHaveFocus();
    });

    await step('keyboard: Enter activates focused copy button without bubbling to root onClick', async () => {
      // Enter на сфокусированной copy-button нативно вызывает click. CopyLine'овский
      // onClick (на root) НЕ вызывается — copy-button делает stopPropagation (как и
      // на mouse-click выше). Проверяем, что root onClick остался прежним.
      const callsBefore = (args.onClick as ReturnType<typeof fn>).mock.calls.length;
      await userEvent.keyboard('{Enter}');
      expect((args.onClick as ReturnType<typeof fn>).mock.calls.length).toBe(callsBefore);
    });
  },
};
