import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Search> = {
  title: 'Components/Search/Tests/Interaction',
  component: Search,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    size: SIZE.S,
    placeholder: 'Поиск',
    background: true,
    outline: true,
    onChange: fn(),
    onSubmit: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function RenderControlledSearch(args) {
    const [value, setValue] = useState('');
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>InteractionTest</DemoTitle>
          <DemoHint>Ввод, очистка и Enter в поле поиска.</DemoHint>
          <DemoActions block>
            <Search
              {...args}
              value={value}
              onChange={next => {
                setValue(next);
                args.onChange?.(next);
              }}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(TEST_IDS.input) as HTMLInputElement;

    await step('type: onChange fired per keystroke, last call holds full value', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'abc');
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenLastCalledWith('abc');
    });

    await step('keyboard Enter: onSubmit fired with current value', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onSubmit).toHaveBeenCalledTimes(1);
      expect(args.onSubmit).toHaveBeenLastCalledWith('abc');
    });

    await step('click clear button: onChange fired with empty string', async () => {
      const clearBtn = canvas.getByTestId(TEST_IDS.clearButton);
      await userEvent.click(clearBtn);
      expect(args.onChange).toHaveBeenLastCalledWith('');
    });
  },
};
