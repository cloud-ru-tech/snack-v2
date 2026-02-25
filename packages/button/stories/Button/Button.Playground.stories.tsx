import type { Meta, StoryObj } from '@storybook/react';

import readme from '../../README.md?raw';
import { Button } from '../../src/Button';
import { APPEARANCE, ICON_POSITION, SIZE, VIEW } from '../../src/Button/constants';
import { type PlaygroundArgs, renderButtonPlayground } from './helpers';

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2782-111011',
    },
    docs: {
      description: {
        component:
          'Кнопка с поддержкой label, иконки (icon + iconPosition), counter, состояний loading/disabled. Полиморфный as: button (по умолчанию), a (ссылка) или кастомный компонент (напр. react-router Link). Варианты view: filled, outline, simple, tonal, elevated, function. При iconPosition=after и counter счётчик отображается абсолютно относительно иконки; при iconPosition=before или без иконки — инлайн после текста.',
      },
    },
  },
  args: {
    label: 'Button',
    view: VIEW.Filled,
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
    iconKey: 'none',
    iconPosition: ICON_POSITION.Before,
    counterEnabled: false,
    counterValue: 5,
    hrefLink: '/about',
  },
  argTypes: {
    as: {
      name: 'as',
      control: 'select',
      options: ['button', 'a'],
      description: 'Полиморфный рендер: button (кнопка) или a (ссылка). Для a передаётся href из поля hrefLink.',
    },
    hrefLink: {
      name: 'href (when as="a")',
      control: 'text',
      description: 'URL ссылки, используется при as="a"',
      if: { arg: 'as', eq: 'a' },
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
    view: {
      control: 'select',
      options: Object.values(VIEW),
    },
    iconKey: {
      name: 'icon',
      control: 'select',
      options: ['none', 'placeholder'],
      description: 'Иконка (PlaceholderSVG)',
    },
    iconPosition: {
      name: 'icon position',
      control: 'select',
      options: Object.values(ICON_POSITION),
      description: 'Позиция иконки. При after и counter — счётчик в абсолютной позиции относительно иконки.',
    },
    counterEnabled: {
      name: 'counter',
      control: 'boolean',
      description:
        'Показать счётчик. При iconPosition=before или без иконки — инлайн; при iconPosition=after — бейдж у иконки.',
    },
    counterValue: {
      name: 'counter value',
      control: { type: 'number', min: 0, max: 999, step: 1 },
      description: 'Значение счётчика',
      if: { arg: 'counterEnabled', eq: true },
    },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: (args: PlaygroundArgs) => renderButtonPlayground(args),
};
