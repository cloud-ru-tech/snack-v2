import { FieldColor } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function ColorWithAlpha() {
  const [value, setValue] = useState('rgba(255, 87, 34, 0.5)');
  return (
    <PortalContextProvider>
      <FieldColor
        label='Цвет с прозрачностью'
        hint='withAlpha добавляет слайдер и поле Alpha в палитру'
        withAlpha
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
