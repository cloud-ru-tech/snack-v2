import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Search> = {
  title: 'Components/Search/Examples/WithAfterContent',
  component: Search,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.M,
    placeholder: 'Поиск',
    outline: true,
    onSubmit: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const WithAfterContent: Story = {
  tags: ['dev', 'test'],
  render: function RenderWithAfterContent(args) {
    const [value, setValue] = useState('');

    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>WithAfterContent</DemoTitle>
          <DemoHint>Кнопка «Найти» в слоте afterContent — внутри поля, справа от кнопки очистки.</DemoHint>
          <DemoActions block>
            <Search
              {...args}
              value={value}
              onChange={setValue}
              afterContent={
                <Button
                  data-test-id={TEST_IDS.afterContentButton}
                  size={args.size}
                  view={VIEW.Function}
                  appearance={APPEARANCE.Neutral}
                  icon={<PlaceholderSVG />}
                  minWidth={false}
                  onClick={() => args.onSubmit?.(value)}
                />
              }
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(TEST_IDS.input) as HTMLInputElement;
    const actionButton = canvas.getByTestId(TEST_IDS.afterContentButton);

    await step('type into search input (setup for next step)', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'query');
    });

    await step('click afterContent button: onSubmit fired with current value', async () => {
      await userEvent.click(actionButton);
      expect(args.onSubmit).toHaveBeenCalledTimes(1);
      expect(args.onSubmit).toHaveBeenLastCalledWith('query');
    });

    await step('Enter in input: onSubmit fired again', async () => {
      await userEvent.click(input);
      await userEvent.keyboard('{Enter}');
      expect(args.onSubmit).toHaveBeenCalledTimes(2);
    });
  },
};
