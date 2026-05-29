import { PortalContextProvider } from '@ds/portal-context';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useRef } from 'react';

const items = [
  { id: 'month', content: { option: 'Month' }, onClick: () => undefined },
  { id: 'year', content: { option: 'Year' }, onClick: () => undefined },
];

export function MobileLayout() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <ButtonDropdown label='Period' size='s' layoutType='mobile' closeDroplistOnItemClick items={items} />
      </div>
    </PortalContextProvider>
  );
}
