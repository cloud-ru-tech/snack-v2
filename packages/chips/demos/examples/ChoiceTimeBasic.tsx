import { ChipChoice, ChipChoiceTimeProps } from '@ds/chips';
import { useState } from 'react';

export function ChoiceTimeBasic() {
  const [value, setValue] = useState<ChipChoiceTimeProps['value']>({
    hours: 9,
    minutes: 30,
  });

  return <ChipChoice.Time label='Время' value={value} onChange={setValue} />;
}
