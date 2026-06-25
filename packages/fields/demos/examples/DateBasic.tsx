import { FieldDate } from '@ds/fields';
import { useState } from 'react';

export function DateBasic() {
  const [value, setValue] = useState<Date | undefined>(undefined);
  return <FieldDate label='Дата' hint='Маска DD.MM.YYYY или выбор в календаре' value={value} onChange={setValue} />;
}
