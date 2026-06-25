import { ChipChoice, ChipChoiceTimeProps } from '@ds/chips';
import { useState } from 'react';

export function ChoiceTimeSeconds() {
  const [value, setValue] = useState<ChipChoiceTimeProps['value']>({
    hours: 9,
    minutes: 30,
    seconds: 15,
  });

  return <ChipChoice.Time label='Время' showSeconds value={value} onChange={setValue} />;
}
