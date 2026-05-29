import { PortalContextProvider } from '@ds/portal-context';
import { WIDTH } from '@ds/segment-control';
import { BUTTON_TYPE, Widget } from '@ds/uikit-product-widget';
import { useRef, useState } from 'react';

export function WithActions() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Widget
          wide
          header={{ title: 'Managed databases', href: '#' }}
          segmentControl={{
            width: WIDTH.Auto,
            defaultValue: 'overview',
            items: [
              { value: 'overview', label: 'Overview' },
              { value: 'events', label: 'Events' },
            ],
          }}
          actions={[
            { label: 'Create', onClick: () => setLastAction('Create') },
            {
              variant: BUTTON_TYPE.Outline,
              label: 'Settings',
              onClick: () => setLastAction('Settings'),
            },
            {
              variant: BUTTON_TYPE.Kebab,
              list: {
                items: [
                  { content: { option: 'Export' }, onClick: () => setLastAction('Export') },
                  { content: { option: 'Archive' }, onClick: () => setLastAction('Archive') },
                ],
              },
            },
          ]}
        >
          Actions are shown in the header for wide desktop widgets.
        </Widget>
        {lastAction ? <span>Last action: {lastAction}</span> : null}
      </div>
    </PortalContextProvider>
  );
}
