import { PortalContextProvider } from '@ds/portal-context';
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';
import { useRef } from 'react';

export function WithCustomAvatar() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <AvatarDetail
          name='Козлова Анна'
          contactData='kozlova@example.com'
          avatar={{ appearance: 'violet', status: 'green' }}
        />
      </div>
    </PortalContextProvider>
  );
}
