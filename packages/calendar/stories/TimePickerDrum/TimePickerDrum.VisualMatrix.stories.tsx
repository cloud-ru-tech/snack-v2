import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable, StoryTableRow } from '#storybook/components';

import { SIZE } from '../../src';
import { TimePickerDrum } from '../../src/helperComponents/TimePickerDrum';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Calendar/Time Picker Drum',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=12303-72025&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj;

function DrumMock({ size, showSeconds }: { size: (typeof SIZE)[keyof typeof SIZE]; showSeconds: boolean }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <div className={styles.matrixCell}>
      <TimePickerDrum
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        selectedDateLabel='January 8 2026'
        showSeconds={showSeconds}
        size={size}
        onHoursChange={setHours}
        onMinutesChange={setMinutes}
        onSecondsChange={showSeconds ? setSeconds : undefined}
      />
    </div>
  );
}

function matrixRow(size: (typeof SIZE)[keyof typeof SIZE]): StoryTableRow {
  return {
    variantLabel: `size ${size}`,
    cells: [
      <DrumMock key={`${size}-no-sec`} showSeconds={false} size={size} />,
      <DrumMock key={`${size}-sec`} showSeconds size={size} />,
    ],
  };
}

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <div className={styles.tablesWrapper}>
      <StoryTable
        columnHeaders={['showSeconds: false', 'showSeconds: true']}
        firstColumnHeader='Variant'
        rows={[matrixRow(SIZE.S), matrixRow(SIZE.M), matrixRow(SIZE.L)]}
        sectionTitle='timePickerDrum'
      />
    </div>
  ),
};
