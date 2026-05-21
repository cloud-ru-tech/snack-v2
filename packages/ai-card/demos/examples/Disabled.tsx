import { AiCard } from '@ds/ai-card';

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiCard title='Disabled' disabled>
        Не реагирует на клики
      </AiCard>
      <AiCard title='Disabled + selected' disabled checked>
        Заблокирован в selected-состоянии
      </AiCard>
    </div>
  );
}
