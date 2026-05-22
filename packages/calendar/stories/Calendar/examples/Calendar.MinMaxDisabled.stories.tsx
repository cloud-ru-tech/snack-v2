import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Calendar, CALENDAR_MODE, SIZE } from '../../../src';
import { BuildCellPropsFunction } from '../../../src/types';
import { CALENDAR_EXAMPLE_TEST_IDS } from '../../testIds';

const TODAY = new Date(2026, 3, 15);
const MIN = new Date(2026, 3, 10);
const MAX = new Date(2026, 3, 20);

/**
 * Эмуляция min/max через `buildCellProps` (нативные `minDate`/`maxDate` отсутствуют в API).
 * Дни вне `[MIN, MAX]` помечаются `isDisabled: true` → cell получает `data-disabled`.
 */
const minMaxBuildCellProps: BuildCellPropsFunction = (date, viewMode) => {
  if (viewMode !== 'month') {
    return { isDisabled: false };
  }
  const t = date.valueOf();
  return { isDisabled: t < MIN.valueOf() || t > MAX.valueOf() };
};

const meta = {
  title: 'Components/Calendar/Calendar/Examples/MinMaxDisabled',
  component: Calendar,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const MinMaxDisabled: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>MinMaxDisabled</DemoTitle>
        <DemoHint>Дни вне допустимого диапазона помечаются как disabled.</DemoHint>
        <DemoActions align='center'>
          <div>
            <Calendar
              data-test-id={CALENDAR_EXAMPLE_TEST_IDS.minMax}
              mode={CALENDAR_MODE.Date}
              size={SIZE.M}
              today={TODAY}
              value={new Date(2026, 3, 15)}
              buildCellProps={minMaxBuildCellProps}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(CALENDAR_EXAMPLE_TEST_IDS.minMax)).toBeVisible();

    // Внутри текущего месяца должны быть disabled-ячейки (дни вне [10..20]).
    const disabled = canvasElement.querySelectorAll('[data-disabled]');
    await expect(disabled.length).toBeGreaterThan(0);
  },
};
