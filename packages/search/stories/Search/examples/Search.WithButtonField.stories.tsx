import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Search> = {
  title: 'Components/Search/Examples/WithButtonField',
  component: Search,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.M,
    placeholder: 'Поиск',
    outline: true,
    onSubmit: fn(),
    'data-test-id': TEST_IDS.root,
  },
  // argTypes построятся автоматически через react-docgen-typescript из типов
  // SearchProps. Здесь outline реально работает (buttonField всегда есть в
  // render'е этого example) — оставляем boolean-контрол по умолчанию.
};

export default meta;
type Story = StoryObj<typeof Search>;

export const WithButtonField: Story = {
  tags: ['dev', 'test'],
  render: function RenderWithButtonField(args) {
    const [value, setValue] = useState('');
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>WithButtonField</DemoTitle>
          <DemoHint>Slot ButtonField справа — кнопка-поиск с шевроном dropdown.</DemoHint>
          <DemoActions block>
            <Search
              {...args}
              value={value}
              onChange={setValue}
              buttonField={{
                action: <PlaceholderSVG />,
                withDropdownList: true,
                onClick: () => args.onSubmit?.(value),
                'data-test-id': TEST_IDS.buttonField,
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
    const buttonField = canvas.getByTestId(TEST_IDS.buttonField);

    await step('type into search input (setup for next step)', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'query');
    });

    await step('click ButtonField: onClick fired with current value', async () => {
      await userEvent.click(buttonField);
      expect(args.onSubmit).toHaveBeenCalledTimes(1);
      expect(args.onSubmit).toHaveBeenLastCalledWith('query');
    });

    await step('keyboard Enter on ButtonField: pressed state via keyDown/keyUp', async () => {
      buttonField.focus();
      await userEvent.keyboard('{Enter}');
      expect(buttonField.getAttribute('data-pressed')).toBeNull();
    });

    await step('blur ButtonField: clears pressed state', async () => {
      await userEvent.tab();
      expect(buttonField.getAttribute('data-pressed')).toBeNull();
    });
  },
};
