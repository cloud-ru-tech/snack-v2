import { PortalContextProvider } from '@ds/portal-context';
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';
import { useRef } from 'react';

export function WithContactData() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <AvatarDetail name='Петрова Мария' contactData='petrova@example.com' />
      </div>
    </PortalContextProvider>
  );
}
