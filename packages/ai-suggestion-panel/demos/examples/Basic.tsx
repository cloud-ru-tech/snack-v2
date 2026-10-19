import { AiSuggestionPanel } from '@ds/ai-suggestion-panel';
import { Typography } from '@ds/typography';
import { useState } from 'react';

const ITEMS = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-monitoring', label: 'Как настроить мониторинг всех ВМ?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
  { value: 'alert-vm-off', label: 'Как создать алерт, если ВМ выключена?' },
  { value: 'vm-metrics', label: 'Какие проблемы видны по метрикам ВМ?' },
];

export function Basic() {
  const [selected, setSelected] = useState<string>();
  const selectedLabel = ITEMS.find(item => item.value === selected)?.label;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <AiSuggestionPanel items={ITEMS} onItemClick={setSelected} />
      <Typography variant='body' size='s'>
        {selectedLabel ? `Выбран вопрос: ${selectedLabel}` : 'Нажмите на вопрос'}
      </Typography>
    </div>
  );
}
