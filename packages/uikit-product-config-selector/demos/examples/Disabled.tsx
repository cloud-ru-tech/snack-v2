import { PortalContextProvider } from '@ds/portal-context';
import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

export function Disabled() {
  const [checked, setChecked] = useState(false);

  return (
    <PortalContextProvider>
      <ConfigSelector
        label='Премиум-конфигурация'
        disabled
        disabledTip='Недоступно на текущем тарифе'
        checked={checked}
        onChange={setChecked}
      />
    </PortalContextProvider>
  );
}
