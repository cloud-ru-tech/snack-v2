import { APPEARANCE, Rating, RatingProps, SIZE } from '@ds/rating';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../../src/constants';
import { TEST_IDS } from './testIds';

const meta: Meta<RatingProps> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Рейтинг звёздами с целыми или половинными значениями.</DemoHint>
        <DemoActions align='center'>
          <Rating {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    size: SIZE.Xs,
    appearance: APPEARANCE.Yellow,
    allowHalf: false,
    allowClear: false,
    count: DEFAULT_STAR_COUNT,
    defaultValue: DEFAULT_RATING_VALUE,
    readonly: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер' },
    appearance: { control: 'select', options: Object.values(APPEARANCE), description: 'Внешний вид' },
    count: { control: 'number', description: 'Общее количество звёзд' },
    defaultValue: { control: 'number', description: 'Значение по умолчанию (uncontrolled)' },
    allowHalf: { control: 'boolean', description: 'Разрешить половинные значения' },
    allowClear: { control: 'boolean', description: 'Сброс рейтинга при повторном клике' },
    readonly: { control: 'boolean', description: 'Только для чтения' },
    className: { control: 'text', description: 'CSS-класс' },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<RatingProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
