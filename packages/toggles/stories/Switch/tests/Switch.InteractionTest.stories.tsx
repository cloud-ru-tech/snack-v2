import { SIZE, Switch, SwitchProps } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<SwitchProps> = {
  title: 'Components/Toggles/Switch/Tests/Interaction',
  component: Switch,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    size: SIZE.XS,
    defaultChecked: false,
    onChange: fn(),
    'data-test-id': TEST_IDS.switch.root,
  },
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик переключает значение и вызывает onChange с новым булевым значением.</DemoHint>
        <DemoActions align='center'>
          <Switch {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(TEST_IDS.switch.nativeInput);

    await step('click: triggers onChange(true)', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onChange).toHaveBeenLastCalledWith(true);
    });

    await step('click again: triggers onChange(false)', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledTimes(2);
      expect(args.onChange).toHaveBeenLastCalledWith(false);
    });
  },
};
