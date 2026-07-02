import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { CALENDAR_MODE, CalendarDropdown, SIZE } from '../../../src';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof CalendarDropdown> = {
  title: 'Components/Calendar/Calendar Dropdown/Examples/WithPresets',
  component: CalendarDropdown,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof CalendarDropdown>;

/**
 * Пресеты быстрого выбора периода доступны только в режиме `date-range`: передайте
 * `presets={{ enabled: true }}` для набора по умолчанию (последняя неделя / месяц / квартал / год …)
 * или `presets={{ items: [...] }}` для собственных пунктов. На десктопе секция пресетов встроена слева
 * от календаря, на мобильной поверхности — отдельный под-экран (кнопка настроек в шапке шторки).
 */
export const WithPresets: Story = {
  tags: ['dev', 'test'],
  args: {
    mode: CALENDAR_MODE.DateRange,
    size: SIZE.S,
    presets: { enabled: true },
    'data-test-id': TEST_IDS.calendarDropdown,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithPresets</DemoTitle>
        <DemoHint>Режим date-range с пресетами периода (последняя неделя / месяц / квартал / …).</DemoHint>
        <DemoActions align='center'>
          <CalendarDropdown {...args}>
            <Button data-test-id={TEST_IDS.calendarDropdownTrigger} label='Выбрать период' />
          </CalendarDropdown>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.calendarDropdownTrigger)).toBeVisible();
  },
};
