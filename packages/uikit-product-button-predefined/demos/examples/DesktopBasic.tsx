import { PortalContextProvider } from '@ds/portal-context';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useRef, useState } from 'react';

const periods = [
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

export function DesktopBasic() {
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
        <ButtonDropdown label={period.label} size='s' layoutType='desktop' items={items} closeDroplistOnItemClick />
      </div>
    </PortalContextProvider>
  );
}
