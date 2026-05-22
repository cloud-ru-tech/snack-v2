import { SIZE, Switch, SwitchProps } from '@ds/toggles';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<SwitchProps> = {
  title: 'Components/Toggles/Switch',
  component: Switch,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type StoryProps = SwitchProps;
type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = args => {
  const [{ checked }, updateArgs] = useArgs<SwitchProps>();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Переключатель состояния включено/выключено.</DemoHint>
        <DemoActions align='center'>
          <Switch {...args} checked={checked} onChange={updatedValue => updateArgs({ checked: updatedValue })} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.switch.root)).toBeVisible();
  },
  args: {
    size: SIZE.XS,
    checked: undefined,
    defaultChecked: undefined,
    loading: false,
    disabled: false,
    /** Без ключей в args Storybook не применяет id/name из URL (автотесты / шаринг ссылки). */
    id: undefined,
    name: undefined,
    'data-test-id': TEST_IDS.switch.root,
  },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
    id: {
      control: 'text',
      description: 'HTML id нативного input',
      table: { category: 'HTML Attributes' },
    },
    name: {
      control: 'text',
      description: 'HTML name нативного input',
      table: { category: 'HTML Attributes' },
    },
  },
};
