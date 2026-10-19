import { AiSuggestionPanel } from '@ds/ai-suggestion-panel';
import { Button } from '@ds/button';
import { useState } from 'react';

const ITEMS = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
];

export function WithClose() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Button label='Показать подсказки' view='outline' appearance='neutral' onClick={() => setVisible(true)} />;
  }

  return <AiSuggestionPanel items={ITEMS} onClose={() => setVisible(false)} />;
}
