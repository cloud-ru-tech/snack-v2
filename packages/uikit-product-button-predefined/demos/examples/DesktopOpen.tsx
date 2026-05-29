import { PortalContextProvider } from '@ds/portal-context';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useRef } from 'react';

const items = [
  { id: 'month', content: { option: 'Month' }, onClick: () => undefined },
  { id: 'year', content: { option: 'Year' }, onClick: () => undefined },
];

export function DesktopOpen() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <ButtonDropdown label='Period' size='m' layoutType='desktop' open items={items} closeDroplistOnItemClick />
      </div>
    </PortalContextProvider>
  );
}
