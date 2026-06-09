import { PortalContextProvider } from '@ds/portal-context';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useRef, useState } from 'react';

const periods = [
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

export function MobileLayout() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState(periods[0]);

  const items = periods.map(option => ({
    id: option.id,
    content: { option: option.label },
    onClick: () => setPeriod(option),
  }));

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <ButtonDropdown label={period.label} size='s' layoutType='mobile' closeDroplistOnItemClick items={items} />
      </div>
    </PortalContextProvider>
  );
}
