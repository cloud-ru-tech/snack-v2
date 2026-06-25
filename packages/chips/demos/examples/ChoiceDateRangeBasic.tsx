import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

export function ChoiceDateRangeBasic() {
  const [value, setValue] = useState<[Date, Date] | undefined>([new Date(2024, 0, 15), new Date(2024, 0, 22)]);

  return <ChipChoice.DateRange label='Период' value={value} onChange={setValue} />;
}
