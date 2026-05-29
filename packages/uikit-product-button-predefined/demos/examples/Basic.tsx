import { PortalContextProvider } from '@ds/portal-context';
import { ButtonDropdown, type ButtonDropdownProps } from '@ds/uikit-product-button-predefined';
import { useRef } from 'react';

export function Basic(props: ButtonDropdownProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <ButtonDropdown {...props} />
      </div>
    </PortalContextProvider>
  );
}
