import { PortalContextProvider } from '@ds/portal-context';
import { FieldPhone } from '@ds/uikit-product-fields-predefined';
import { useRef, useState } from 'react';

export function FieldPhoneBasic() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: 320 }}>
        <FieldPhone label='Телефон' value={value} onChange={setValue} searchPlaceholder='Поиск страны' />
      </div>
    </PortalContextProvider>
  );
}
