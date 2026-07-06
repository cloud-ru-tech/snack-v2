import { PortalContextProvider } from '@ds/portal-context';
import {
  ARMENIA_COUNTRY_CODE,
  BELARUS_COUNTRY_CODE,
  FieldPhone,
  KAZAKHSTAN_COUNTRY_CODE,
  RUSSIA_COUNTRY_CODE,
} from '@ds/uikit-product-fields-predefined';
import { useRef, useState } from 'react';

export function FieldPhoneCountrySettings() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: 320 }}>
        <FieldPhone
          label='Телефон (СНГ)'
          value={value}
          onChange={setValue}
          options={{
            includedCountries: [
              RUSSIA_COUNTRY_CODE,
              BELARUS_COUNTRY_CODE,
              KAZAKHSTAN_COUNTRY_CODE,
              ARMENIA_COUNTRY_CODE,
            ],
          }}
        />
      </div>
    </PortalContextProvider>
  );
}
