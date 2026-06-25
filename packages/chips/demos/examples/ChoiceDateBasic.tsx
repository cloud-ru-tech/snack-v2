import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

export function ChoiceDateBasic() {
  const [value, setValue] = useState<Date | undefined>(new Date(2024, 0, 15));

  return <ChipChoice.Date label='Дата' value={value} onChange={setValue} />;
}
