import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

export function ChoiceDateTime() {
  const [value, setValue] = useState<Date | undefined>(new Date(2024, 0, 15, 9, 30, 0));

  return <ChipChoice.Date label='Дата и время' mode='date-time' showSeconds value={value} onChange={setValue} />;
}
