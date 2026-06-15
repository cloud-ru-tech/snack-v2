import { FieldColor } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function ColorBasic() {
  const [value, setValue] = useState('#1976d2');
  return (
    <PortalContextProvider>
      <FieldColor
        label='Цвет акцента'
        hint='Откройте палитру шевроном или кликом по полю'
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
