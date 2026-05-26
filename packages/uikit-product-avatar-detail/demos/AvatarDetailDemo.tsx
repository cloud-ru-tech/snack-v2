import { PortalContextProvider } from '@ds/portal-context';
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';
import { useRef } from 'react';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

export function AvatarDetailDemo() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Canvas
          component={AvatarDetail}
          componentDoc={doc.AvatarDetail}
          defaultProps={{
            name: 'Иванов Иван',
            contactData: 'ivanov@example.com',
            description: 'Frontend-разработчик',
          }}
          controls={{
            name: { type: 'text' },
            contactData: { type: 'text' },
            description: { type: 'text' },
          }}
          excludeProps={['className', 'data-test-id', 'avatar']}
        />
      </div>
    </PortalContextProvider>
  );
}
