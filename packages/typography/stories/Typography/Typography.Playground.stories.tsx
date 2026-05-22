import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_WEIGHT,
  SIZE,
  Typography,
  TypographyProps,
  VARIANT,
  WEIGHT,
} from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Типографический компонент: variant, size, weight и произвольный HTML-тег.</DemoHint>
        <DemoActions align='center'>
          <Typography {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    children: 'Typography text',
    variant: DEFAULT_VARIANT,
    size: DEFAULT_SIZE,
    weight: DEFAULT_WEIGHT,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст для отображения',
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANT),
      description: 'Вариант типографики',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер типографики',
    },
    weight: {
      control: 'select',
      options: Object.values(WEIGHT),
      description: 'Начертание шрифта',
    },
    as: {
      control: 'text',
      description: 'HTML тег для рендеринга (по умолчанию выбирается автоматически)',
    },
    className: {
      control: 'text',
      description: 'CSS-класс',
    },
  },
};

export default meta;
type Story = StoryObj<TypographyProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
