import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useState } from 'react';

const periods = [
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

export function DesktopOpen() {
  const [period, setPeriod] = useState(periods[0]);

  const items = periods.map(option => ({
    id: option.id,
    content: { label: option.label },
    onClick: () => setPeriod(option),
  }));

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
      <ButtonDropdown label={period.label} size='m' open items={items} />
    </AdaptiveProvider>
  );
}
