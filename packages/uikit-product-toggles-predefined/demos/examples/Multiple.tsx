import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { useState } from 'react';

export function Multiple() {
  const [value, setValue] = useState<string[]>(['backup']);

  return (
    <ToggleGroup selectionMode='multiple' value={value} onChange={next => setValue(next ?? [])} gap='m'>
      <ToggleCard value='backup' title='Резервное копирование' description='Ежедневные снапшоты' />
      <ToggleCard value='monitoring' title='Мониторинг' description='Алерты и метрики 24/7' />
      <ToggleCard value='cdn' title='CDN' description='Раздача статики по миру' />
    </ToggleGroup>
  );
}
