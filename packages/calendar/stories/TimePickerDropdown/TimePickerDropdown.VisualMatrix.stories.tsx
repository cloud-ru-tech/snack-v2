import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SIZE, TimePickerDropdown } from '../../src';
import { getTimePickerDropdownMatrixCellTestId, getTimePickerDropdownMatrixTriggerTestId } from '../testIds';

const meta: Meta<typeof TimePickerDropdown> = {
  title: 'Components/Calendar/Time Picker Dropdown',
  component: TimePickerDropdown,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TimePickerDropdown>;

const sizes = Object.values(SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Size × showSeconds (триггеры, dropdown закрыт)'
      firstColumnHeader='Size'
      columnHeaders={['showSeconds=true', 'showSeconds=false']}
      rows={sizes.map(size => ({
        variantLabel: size,
        cells: ([true, false] as const).map(showSeconds => (
          <TimePickerDropdown
            key={`${size}-${showSeconds ? 'sec' : 'no-sec'}`}
            size={size}
            showSeconds={showSeconds}
            trigger='click'
            data-test-id={getTimePickerDropdownMatrixCellTestId(size, showSeconds)}
          >
            <Button
              label={`${size} ${showSeconds ? 'sec' : 'no-sec'}`}
              data-test-id={getTimePickerDropdownMatrixTriggerTestId(size, showSeconds)}
            />
          </TimePickerDropdown>
        )),
      }))}
    />
  ),
};
