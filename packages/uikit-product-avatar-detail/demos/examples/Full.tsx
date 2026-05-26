import { PortalContextProvider } from '@ds/portal-context';
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';
import { useRef } from 'react';

export function Full() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <AvatarDetail
          name='Новиков Дмитрий'
          contactData='novikov@example.com'
          description='DevOps-инженер, Cloud Platform'
          avatar={{ appearance: 'green', status: 'green' }}
        />
      </div>
    </PortalContextProvider>
  );
}
