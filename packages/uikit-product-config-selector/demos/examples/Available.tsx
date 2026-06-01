import { PortalContextProvider } from '@ds/portal-context';
import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

export function Available() {
  const [checked, setChecked] = useState(false);

  return (
    <PortalContextProvider>
      <ConfigSelector
        label='Рекомендуемый тариф'
        available
        availableTip='Подходит для большинства проектов'
        checked={checked}
        onChange={setChecked}
      />
    </PortalContextProvider>
  );
}
