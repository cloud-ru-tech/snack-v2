import { PortalContextProvider } from '@ds/portal-context';
import { BUTTON_TYPE, Widget } from '@ds/uikit-product-widget';
import { useRef, useState } from 'react';

export function MobileLayout() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Widget
          layoutType='mobile'
          wide
          header={{ title: 'Object storage', href: '#' }}
          actions={[
            { label: 'Upload', onClick: () => setLastAction('Upload') },
            {
              variant: BUTTON_TYPE.Kebab,
              list: {
                items: [
                  {
                    content: { option: 'Delete bucket' },
                    onClick: () => setLastAction('Delete bucket'),
                  },
                ],
              },
            },
          ]}
        >
          On mobile, wide is ignored: primary actions move to the footer, overflow goes to kebab.
        </Widget>
        {lastAction ? <span>Last action: {lastAction}</span> : null}
      </div>
    </PortalContextProvider>
  );
}
