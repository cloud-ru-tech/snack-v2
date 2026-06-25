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
    content: { option: option.label },
    onClick: () => setPeriod(option),
  }));

  return <ButtonDropdown label={period.label} size='m' layoutType='desktop' open items={items} />;
}
