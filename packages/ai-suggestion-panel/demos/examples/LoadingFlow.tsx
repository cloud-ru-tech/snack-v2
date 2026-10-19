import { AiSuggestionPanel, AiSuggestionPanelItem } from '@ds/ai-suggestion-panel';
import { useEffect, useState } from 'react';

const QUESTIONS: AiSuggestionPanelItem[] = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-monitoring', label: 'Как настроить мониторинг всех ВМ?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
];

/** Время «ответа ассистента» в демо. */
const ANSWER_DELAY_MS = 2000;

export function LoadingFlow() {
  const [pendingValue, setPendingValue] = useState<string>();

  useEffect(() => {
    if (!pendingValue) return;

    const timer = setTimeout(() => setPendingValue(undefined), ANSWER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [pendingValue]);

  const items = QUESTIONS.map(question => ({ ...question, loading: question.value === pendingValue }));

  return <AiSuggestionPanel items={items} onItemClick={setPendingValue} />;
}
