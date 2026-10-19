import { AiSuggestionPanel, SIZE } from '@ds/ai-suggestion-panel';

const ITEMS = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
];

export function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <AiSuggestionPanel items={ITEMS} size={SIZE.S} />
      <AiSuggestionPanel items={ITEMS} size={SIZE.M} />
    </div>
  );
}
