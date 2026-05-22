import { Checkbox, CheckboxProps, SIZE } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Toggles/Checkbox/Tests/Interaction',
  component: Checkbox,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    size: SIZE.XS,
    defaultChecked: false,
    onChange: fn(),
    'data-test-id': TEST_IDS.checkbox.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик переключает checked, indeterminate сбрасывается при клике.</DemoHint>
        <DemoActions align='center'>
          <Checkbox {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(TEST_IDS.checkbox.nativeInput);

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
