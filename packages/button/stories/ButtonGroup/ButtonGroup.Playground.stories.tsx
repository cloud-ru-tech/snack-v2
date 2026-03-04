import type { Meta, StoryObj } from '@storybook/react';

import { APPEARANCE, SIZE, VIEW } from '../../src/Button/constants';
import { Appearance, type View } from '../../src/Button/types';
import { ButtonGroup, type ButtonGroupProps } from '../../src/ButtonGroup';

type PlaygroundArgs = ButtonGroupProps & {
  primaryActionText?: string;
  primaryActionView?: View;
  showSecondary?: boolean;
  secondaryActionText?: string;
  secondaryActionView?: View;
  secondaryActionAppearance?: Appearance;
  showTertiary?: boolean;
  tertiaryActionText?: string;
  tertiaryActionView?: View;
  tertiaryActionAppearance?: Appearance;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=9099-51008',
    },
    docs: {
      description: {
        component:
          'Группа действий: primaryAction (filled), secondaryAction (outline), tertiaryAction (simple). Поддерживает size, vertical, centered, break, filled.',
      },
    },
  },
  args: {
    size: SIZE.M,
    vertical: false,
    centered: false,
    break: false,
    filled: false,
    primaryActionText: 'Primary text',
    primaryActionView: 'filled',
    showSecondary: true,
    secondaryActionText: 'Secondary text',
    secondaryActionView: 'outline',
    secondaryActionAppearance: 'neutral',
    showTertiary: false,
    tertiaryActionText: 'Tertiary text',
    tertiaryActionView: 'simple',
    tertiaryActionAppearance: 'neutral',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер кнопок',
    },
    vertical: {
      control: 'boolean',
      description: 'Вертикальное расположение',
    },
    centered: {
      control: 'boolean',
      description: 'Центрирование по горизонтали',
    },
    break: {
      control: 'boolean',
      description: 'Перенос на новую строку',
    },
    filled: {
      control: 'boolean',
      description: 'Заливка контейнера',
    },
    showSecondary: {
      control: 'boolean',
      description: 'Показать secondary',
    },
    showTertiary: {
      control: 'boolean',
      description: 'Показать tertiary',
    },
    primaryActionText: { control: 'text' },
    primaryActionView: {
      control: 'select',
      options: Object.values(VIEW),
    },
    secondaryActionText: {
      control: 'text',
      if: { arg: 'showSecondary', eq: true },
    },
    secondaryActionView: {
      control: 'select',
      options: Object.values(VIEW),
      if: { arg: 'showSecondary', eq: true },
    },
    secondaryActionAppearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      if: { arg: 'showSecondary', eq: true },
    },
    tertiaryActionText: {
      control: 'text',
      if: { arg: 'showTertiary', eq: true },
    },
    tertiaryActionView: {
      control: 'select',
      options: Object.values(VIEW),
      if: { arg: 'showTertiary', eq: true },
    },
    tertiaryActionAppearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      if: { arg: 'showTertiary', eq: true },
    },
    primaryAction: { control: false },
    secondaryAction: { control: false },
    tertiaryAction: { control: false },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <ButtonGroup
      size={args.size}
      vertical={args.vertical}
      centered={args.centered}
      break={args.break}
      filled={args.filled}
      primaryAction={{ label: args.primaryActionText, view: args.primaryActionView }}
      secondaryAction={
        args.showSecondary
          ? {
              label: args.secondaryActionText,
              view: args.secondaryActionView,
              appearance: args.secondaryActionAppearance,
            }
          : undefined
      }
      tertiaryAction={
        args.showTertiary
          ? { label: args.tertiaryActionText, view: args.tertiaryActionView, appearance: args.tertiaryActionAppearance }
          : undefined
      }
      className={args.className}
    />
  ),
};
