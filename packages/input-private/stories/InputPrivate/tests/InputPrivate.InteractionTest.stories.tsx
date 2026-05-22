import { InputPrivate } from '@ds/input-private';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof InputPrivate> = {
  title: 'Components/InputPrivate/Tests/Interaction',
  component: InputPrivate,
  parameters: { layout: 'fullscreen', figma: { disable: true }, controls: { disable: true } },
  args: {
    placeholder: 'Введите значение',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onKeyDown: fn(),
    'data-test-id': TEST_IDS.root,
  },
};
export default meta;
type Story = StoryObj<typeof InputPrivate>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function RenderControlled(args) {
    const [value, setValue] = useState('');
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>InteractionTest</DemoTitle>
          <DemoHint>Контролируемый input для покрытия onChange/onClick/onFocus/onBlur/onKeyDown.</DemoHint>
          <DemoActions align='center'>
            <InputPrivate
              {...args}
              value={value}
              onChange={(next, event) => {
                setValue(next);
                args.onChange?.(next, event);
              }}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ args, canvasElement, step }) => {
    const input = within(canvasElement).getByTestId(TEST_IDS.root) as HTMLInputElement;

    await step('click + type: onClick + onChange fired, value mirrored', async () => {
      await userEvent.click(input);
      expect(args.onClick).toHaveBeenCalled();
      await userEvent.type(input, 'hi');
      expect(args.onChange).toHaveBeenCalled();
      expect(input.value).toBe('hi');
    });

    await step('keyboard: onKeyDown fired on ArrowLeft', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      expect(args.onKeyDown).toHaveBeenCalled();
    });

    await step('blur: onBlur fired', async () => {
      input.blur();
      expect(args.onBlur).toHaveBeenCalled();
    });
  },
};
