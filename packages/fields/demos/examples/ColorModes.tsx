import { FieldColor } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function ColorModes() {
  const [value, setValue] = useState('#4caf50');
  return (
    <PortalContextProvider>
      <FieldColor
        label='Только HEX и RGB'
        hint='availableModes ограничивает переключатель моделей в палитре'
        availableModes={['hex', 'rgb']}
        autoApply
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
