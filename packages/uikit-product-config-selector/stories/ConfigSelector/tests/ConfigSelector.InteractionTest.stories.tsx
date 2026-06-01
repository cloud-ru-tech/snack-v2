import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ConfigSelector> = {
  title: 'Uikit Product/ConfigSelector/Tests/Interaction',
  component: ConfigSelector,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'Конфигурация',
    checked: false,
    onChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof ConfigSelector>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик вызывает onChange(!checked); Tab фокусирует input; клик по disabled — игнорируется.</DemoHint>
        <DemoActions align='center'>
          <ConfigSelector {...args} />
          <ConfigSelector {...args} disabled disabledTip='Опция недоступна' data-test-id='config-selector-disabled' />
          {/* available + availableTip + checked:false — ветка tooltip-open, hover'ится из interaction.spec.ts
              (hover по порталу в storybook-play нестабилен). tip обёрнут в span с id для адресации content портала. */}
          <ConfigSelector
            {...args}
            available
            availableTip={<span data-test-id={TEST_IDS.availableTip}>Рекомендуемая опция</span>}
            data-test-id={TEST_IDS.availableRoot}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);

    await step('click: toggles onChange(!checked)', async () => {
      await userEvent.click(root);
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onChange).toHaveBeenCalledWith(true, expect.anything());
    });

    await step('keyboard: Tab focuses the input', async () => {
      // Оба chip жёстко ставят TEST_IDS.input → берём input включённого через within(root).
      const input = within(root).getByTestId(TEST_IDS.input);
      input.blur();
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });

    await step('click on disabled chip does NOT call onChange', async () => {
      await userEvent.click(canvas.getByTestId('config-selector-disabled'));
      expect(args.onChange).toHaveBeenCalledTimes(1);
    });
  },
};
