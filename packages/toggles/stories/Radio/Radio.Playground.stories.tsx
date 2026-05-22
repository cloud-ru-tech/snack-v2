import { Radio, RadioProps, SIZE } from '@ds/toggles';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Radio> = {
  title: 'Components/Toggles/Radio',
  component: Radio,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.XS,
    checked: undefined,
    defaultChecked: undefined,
    loading: false,
    disabled: false,
    id: undefined,
    name: undefined,
    value: undefined,
    className: undefined,
    'data-test-id': TEST_IDS.radio.root,
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Controlled checked' },
    defaultChecked: { control: 'boolean', description: 'Начальный checked (uncontrolled)' },
    loading: { control: 'boolean', description: 'Состояние загрузки' },
    disabled: { control: 'boolean', description: 'Отключён' },
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер' },
    id: { control: 'text', description: 'HTML id нативного input', table: { category: 'HTML Attributes' } },
    name: { control: 'text', description: 'HTML name', table: { category: 'HTML Attributes' } },
    value: { control: 'text', description: 'HTML value', table: { category: 'HTML Attributes' } },
    className: { control: 'text', description: 'CSS-класс корня' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

const Template: StoryFn<RadioProps> = args => {
  const [{ checked }, updateArgs] = useArgs<RadioProps>();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Радио-переключатель для выбора одного варианта из набора.</DemoHint>
        <DemoActions align='center'>
          <Radio {...args} checked={checked} onChange={next => updateArgs({ checked: next })} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.radio.root)).toBeVisible();
  },
};
