import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { CALENDAR_MODE, CalendarDropdown, SIZE } from '../../src';
import { getCalendarDropdownMatrixCellTestId, getCalendarDropdownMatrixTriggerTestId } from '../testIds';

const meta: Meta<typeof CalendarDropdown> = {
  title: 'Components/Calendar/Calendar Dropdown',
  component: CalendarDropdown,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CalendarDropdown>;

const sizes = Object.values(SIZE);
const modes = [CALENDAR_MODE.Date, CALENDAR_MODE.DateTime, CALENDAR_MODE.DateRange] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Size × Mode (триггеры, dropdown закрыт)'
      firstColumnHeader='Size'
      columnHeaders={modes.map(m => m)}
      rows={sizes.map(size => ({
        variantLabel: size,
        cells: modes.map(mode => (
          <CalendarDropdown
            key={`${size}-${mode}`}
            mode={mode}
            size={size}
            trigger='click'
            data-test-id={getCalendarDropdownMatrixCellTestId(size, mode)}
          >
            <Button label={`${size}/${mode}`} data-test-id={getCalendarDropdownMatrixTriggerTestId(size, mode)} />
          </CalendarDropdown>
        )),
      }))}
    />
  ),
};
