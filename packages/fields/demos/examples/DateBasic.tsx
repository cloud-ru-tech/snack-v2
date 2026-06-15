import { FieldDate } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function DateBasic() {
  const [value, setValue] = useState<Date | undefined>(undefined);
  return (
    <PortalContextProvider>
      <FieldDate label='Дата' hint='Маска DD.MM.YYYY или выбор в календаре' value={value} onChange={setValue} />
    </PortalContextProvider>
  );
}
