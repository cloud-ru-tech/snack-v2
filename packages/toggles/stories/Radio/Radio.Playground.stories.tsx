import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import togglesReadme from '../../README.md?raw';
import { Radio, RadioProps, SIZE } from '../../src';
import { RADIO_STORIES_SCENARIO, RadioStoriesScenario, SCENARIO_PRESETS } from './constants';

const meta: Meta<RadioProps & { storiesScenario: RadioStoriesScenario }> = {
  title: 'Components/Toggles/Radio',
  component: Radio,
  parameters: {
    readme: { content: togglesReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2815-30903&p=f&m=dev',
    },
  },
};

export default meta;

type StoryProps = RadioProps & { storiesScenario: RadioStoriesScenario };
type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = args => {
  const { storiesScenario, ...rest } = args;
  const [{ checked }, updateArgs] = useArgs<RadioProps>();

  if (storiesScenario === RADIO_STORIES_SCENARIO.Playground) {
    return <Radio {...rest} checked={checked} onChange={updatedValue => updateArgs({ checked: updatedValue })} />;
  }

  const preset = SCENARIO_PRESETS[storiesScenario];
  return <Radio {...rest} {...preset} />;
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    storiesScenario: RADIO_STORIES_SCENARIO.Playground,
    size: SIZE.XS,
    checked: undefined,
    defaultChecked: undefined,
    loading: false,
    disabled: false,
  },
  argTypes: {
    storiesScenario: {
      name: '[Stories]: E2E сценарий',
      control: 'select',
      options: Object.values(RADIO_STORIES_SCENARIO),
      description:
        'Для автотестов и шаринга по ссылке: строковый сценарий стабильнее boolean в URL. Режим playground — интерактив как раньше.',
      table: { category: 'Stories' },
    },
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
  },
};
